import { useCallback, useState } from "react";

// If this module is replaced mid-session (signature drift between baked
// boilerplate and the agent_daemon snapshot), tell Vite to do a full page
// reload instead of HMR module replacement. Hot-swapping the hook in place
// is what triggers React's "Rendered fewer hooks than expected" — the new
// version may return a different internal hook count than the old.
if (import.meta.hot) {
  import.meta.hot.decline();
}

/**
 * Runtime owner of form submission. Reads the form UUID from
 * `<form data-form-uuid="...">` at submit time — the data attribute
 * is the only source of truth, injected deterministically by the
 * agent_daemon's Phase-1 wiring.
 */
export type FormSubmissionStatus = "idle" | "submitting" | "success" | "error";

export interface UseFormSubmissionResult {
  submit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  status: FormSubmissionStatus;
  fieldErrors: Record<string, string>;
  isSubmitting: boolean;
  /** Reset status back to "idle" and clear field errors. Use for "Submit Another"-style UX. */
  reset: () => void;
}

function parseFieldErrors(body: unknown): Record<string, string> {
  if (!body || typeof body !== "object") return {};
  const root = body as Record<string, unknown>;
  // DRF envelope: { data: { field: "msg" } }
  const data = (root as { data?: unknown }).data;
  if (data && typeof data === "object" && !Array.isArray(data)) {
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(data as Record<string, unknown>)) {
      if (typeof v === "string") out[k] = v;
      else if (Array.isArray(v) && typeof v[0] === "string") out[k] = v[0];
    }
    if (Object.keys(out).length) return out;
  }
  // DRF default: { field: ["msg"] }
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(root)) {
    if (typeof v === "string") out[k] = v;
    else if (Array.isArray(v) && typeof v[0] === "string") out[k] = v[0];
  }
  return out;
}

export function useFormSubmission(): UseFormSubmissionResult {
  const [status, setStatus] = useState<FormSubmissionStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const submit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;
      const uuid = form.dataset.formUuid;
      if (!uuid || uuid === "__FORM__") {
        // eslint-disable-next-line no-console
        console.warn("[useFormSubmission] missing UUID — scanner placeholder still present.");
        setStatus("error");
        return;
      }
      setStatus("submitting");
      setFieldErrors({});
      const base = (import.meta.env.VITE_FORM_SUBMIT_URL as string | undefined) || "";
      const url = `${base}/api/forms/${uuid}/submit/`;
      const formData = new FormData(form);
      // A selected file (name set, even 0 bytes → backend can reject it) → POST
      // multipart, no Content-Type (browser sets the boundary). Else JSON envelope.
      const hasFile = Array.from(formData.values()).some(
        (v) => v instanceof File && v.name !== ""
      );
      const init: RequestInit = hasFile
        ? { method: "POST", body: formData }
        : {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: Object.fromEntries(formData.entries()) }),
          };
      try {
        const response = await fetch(url, init);
        if (response.ok) {
          setStatus("success");
          form.reset();
          return;
        }
        if (response.status === 400) {
          const body = await response.json().catch(() => null);
          const errors = parseFieldErrors(body);
          if (Object.keys(errors).length) setFieldErrors(errors);
        }
        setStatus("error");
      } catch {
        setStatus("error");
      }
    },
    []
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setFieldErrors({});
  }, []);

  return { submit, status, fieldErrors, isSubmitting: status === "submitting", reset };
}
