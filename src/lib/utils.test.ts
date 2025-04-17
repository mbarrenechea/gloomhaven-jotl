import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("returns an empty string when no arguments are provided", () => {
    expect(cn()).toBe("");
  });

  it("returns a single class name when one is provided", () => {
    expect(cn("text-gray-500")).toBe("text-gray-500");
  });

  it("merges multiple class names into a single string", () => {
    expect(cn("text-gray-500", "text-gray-700")).toBe("text-gray-700");
  });

  it("merges duplicate class names correctly", () => {
    expect(cn("bg-gray-500", "text-gray-500", "text-gray-700")).toBe("bg-gray-500 text-gray-700");
  });

  it("handles empty and falsy values gracefully", () => {
    expect(cn("", null, undefined, "text-gray-500")).toBe("text-gray-500");
  });
});
