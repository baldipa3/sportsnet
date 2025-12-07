import "@testing-library/jest-dom";

import { vi } from "vitest";

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
