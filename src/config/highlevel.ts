// src/config/highlevel.ts
//
// Centralized reference for the HighLevel-hosted appraisal request form
// embedded on /request/. HighLevel owns the form itself (fields, labels,
// SMS consent language, legal links, confirmation message, notifications) —
// this file only centralizes the website's pointer to it, so swapping to a
// different HighLevel form later is a one-line change here.

/** "AAA Appraisal Request Form 11242026" in the AAA HighLevel subaccount. */
export const HIGHLEVEL_REQUEST_FORM_ID = "cZms2J1HnvOI16qDcsPl";

export const HIGHLEVEL_REQUEST_FORM_NAME = "AAA Appraisal Request Form 11242026";

/** Iframe src — exactly as supplied by HighLevel's inline embed code. */
export const HIGHLEVEL_REQUEST_FORM_SRC = `https://links.digitaladstream.com/widget/form/${HIGHLEVEL_REQUEST_FORM_ID}`;

/** Initial height HighLevel supplied with the embed (data-height). */
export const HIGHLEVEL_REQUEST_FORM_HEIGHT = 1013;

/** HighLevel's iframe-resizer counterpart script — required for dynamic height. */
export const HIGHLEVEL_EMBED_SCRIPT_SRC = "https://links.digitaladstream.com/js/form_embed.js";
