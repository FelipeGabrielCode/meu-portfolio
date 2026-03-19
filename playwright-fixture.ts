// Re-export the base fixture from the package.
// This repo may not have the dependency installed (or its types), so we load it dynamically.
// This keeps `next build` type-checking from failing.

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fixture = require("lovable-agent-playwright-config/fixture") as {
  test: unknown;
  expect: unknown;
};

export const test = fixture.test;
export const expect = fixture.expect;
