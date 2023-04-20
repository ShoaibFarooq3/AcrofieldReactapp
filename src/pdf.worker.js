import { WorkerMessageHandler } from "./core/worker.js";

/* eslint-disable-next-line no-unused-vars */
const pdfjsVersion =
    typeof PDFJSDev !== "undefined" ? PDFJSDev.eval("BUNDLE_VERSION") : void 0;
/* eslint-disable-next-line no-unused-vars */
const pdfjsBuild =
    typeof PDFJSDev !== "undefined" ? PDFJSDev.eval("BUNDLE_BUILD") : void 0;

export { WorkerMessageHandler };