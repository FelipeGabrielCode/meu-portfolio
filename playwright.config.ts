// This repo may be missing `lovable-agent-playwright-config` at build time.
// Use a dynamic fallback so `next build` type-checking doesn't fail.

let createLovableConfig: any;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  createLovableConfig = require("lovable-agent-playwright-config/config").createLovableConfig;
} catch {
  createLovableConfig = () => ({});
}

export default createLovableConfig({
  // Add your custom playwright configuration overrides here
});
