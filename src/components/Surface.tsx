import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SurfaceProps extends HTMLAttributes<HTMLElement> {
  // tone re-scopes the design tokens for the subtree (dark -> .dark, light -> .light)
  // so descendant text (text-foreground / text-muted-foreground) is legible by default.
  // Required: a silent light default re-scopes tokens with no author intent.
  tone: "light" | "dark";
  as?: "section" | "div" | "article" | "aside";
  fill?: boolean;
}

const Surface = forwardRef<HTMLElement, SurfaceProps>(
  ({ tone, as: Tag = "section", fill = true, className, children, ...props }, ref) => {
    return (
      <Tag
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        // `w-full` for the same reason as ImageBackground — width:auto only spans the
        // container in normal flow, so a flex/grid parent would shrink it. (LPS-1561)
        className={cn("w-full", tone, fill && "bg-background text-foreground", className)}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Surface.displayName = "Surface";

// Named AND default export — same module-link-crash guard ImageBackground documents.
export { Surface };
export default Surface;
export type { SurfaceProps };
