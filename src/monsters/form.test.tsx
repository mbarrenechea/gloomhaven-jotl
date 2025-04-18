import { render, screen, cleanup } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { MonsterForm } from "./form";

// Mock the ResizeObserver
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

window.HTMLElement.prototype.scrollIntoView = function () {};

// Stub the global ResizeObserver
vi.stubGlobal("ResizeObserver", ResizeObserverMock);

vi.mock("usehooks-ts", () => ({
  useLocalStorage: vi.fn().mockReturnValue([[], vi.fn()]),
}));

describe("MonsterForm", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders the form with default values", () => {
    render(<MonsterForm />);
    expect(screen.getByText("Monster")).toBeDefined();
    expect(screen.getByText("Level")).toBeDefined();
    expect(screen.getByText("Type")).toBeDefined();
    expect(screen.getByText("Quantity")).toBeDefined();
    expect(screen.getByRole("button", { name: /create/i })).toBeDefined();
  });

  // it("allows selecting a monster", () => {
  //   render(<MonsterForm />);
  //   fireEvent.click(screen.getByText("Select a monster"));
  //   fireEvent.click(screen.getByText("Fanático"));
  //   expect(screen.getByText("Fanático")).toBeDefined();
  // });

  // it("allows changing the level", () => {
  //   render(<MonsterForm />);
  //   const levelButton = screen.getByLabelText("2");
  //   fireEvent.click(levelButton);
  //   expect(levelButton).toHaveProperty("aria-checked", "true");
  // });

  // it("allows selecting the type", () => {
  //   render(<MonsterForm />);
  //   const normalInput = screen.getByRole("radio", { name: "Normal" });
  //   const normalButton = screen.getByLabelText("Normal");
  //   fireEvent.click(normalButton);
  //   expect(normalInput).toHaveProperty("checked", "true");

  //   const eliteInput = screen.getByRole("radio", { name: "Elite" });
  //   const eliteButton = screen.getByLabelText("Elite");
  //   fireEvent.click(eliteButton);
  //   expect(eliteInput).toHaveProperty("aria-checked", "true");
  // });

  // it("allows changing the quantity", () => {
  //   render(<MonsterForm />);
  //   const quantityButton = screen.getByLabelText("3");
  //   fireEvent.click(quantityButton);
  //   expect(quantityButton).toHaveProperty("aria-checked", "true");
  // });

  // it("submits the form and resets it", () => {
  //   const setMonstersMock = vi.fn();
  //   (useLocalStorage as vi.Mock).mockReturnValue([[], setMonstersMock]);

  //   render(<MonsterForm />);
  //   fireEvent.click(screen.getByText("Select a monster"));
  //   fireEvent.click(screen.getByText("Fanático"));

  //   fireEvent.click(screen.getByLabelText("2"));
  //   fireEvent.click(screen.getByLabelText("Normal"));
  //   fireEvent.click(screen.getByLabelText("3"));

  //   fireEvent.click(screen.getByRole("button", { name: /create/i }));

  //   expect(setMonstersMock).toHaveBeenCalledWith(
  //     expect.arrayContaining([
  //       expect.objectContaining({
  //         id: "monster1-0",
  //         level: 2,
  //         type: "normal",
  //         health: 20,
  //         movement: 3,
  //         attack: 2,
  //       }),
  //     ]),
  //   );

  //   expect(screen.getByText("Select a monster")).toBeDefined();
  // });
});
