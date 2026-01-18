import "@testing-library/jest-dom";

import { vi } from "vitest";

// Shim for relay-test-utils which expects jest global
// @ts-ignore - jest is not actually used, but relay-test-utils checks for it
globalThis.jest = {
  fn: vi.fn,
  spyOn: vi.spyOn,
};

export {};

beforeAll(() => {
  vi.spyOn(console, "warn").mockImplementation((msg) => {
    if (
      typeof msg === "string" &&
      (msg.includes("React Router Future Flag Warning:") ||
        msg.includes("v7_startTransition") ||
        msg.includes("v7_relativeSplatPath"))
    ) {
      return;
    }
    console.warn(msg);
  });
});
