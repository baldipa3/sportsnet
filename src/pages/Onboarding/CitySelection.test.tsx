import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";

// Mock react-relay
vi.mock("react-relay", () => ({
  useLazyLoadQuery: vi.fn(),
  graphql: vi.fn((query) => query),
}));

// Mock react-country-flag
vi.mock("react-country-flag", () => ({
  default: () => <div data-testid="country-flag">Flag</div>,
}));

// Import after mocking
import CitySelection from "./CitySelection";
import { useLazyLoadQuery } from "react-relay";

describe("CitySelection Component", () => {
  const mockUseLazyLoadQuery = useLazyLoadQuery as any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseLazyLoadQuery.mockReturnValue({
      countriesWithCities: [
        {
          id: "1",
          name: "USA",
          code: "US",
          cities: [
            { id: "1", name: "New York" },
            { id: "2", name: "Los Angeles" },
          ],
        },
      ],
    });
  });

  test("renders the city selection page", () => {
    render(
      <BrowserRouter>
        <CitySelection />
      </BrowserRouter>
    );
    expect(
      screen.getByText("Where do you play sports?")
    ).toBeInTheDocument();
  });

  test("renders country selection initially", () => {
    render(
      <BrowserRouter>
        <CitySelection />
      </BrowserRouter>
    );
    expect(screen.getByText("Select your country")).toBeInTheDocument();
  });
});
