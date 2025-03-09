import { RevenueChart } from "@/components/revenue-chart";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("RevenueChart", () => {
  it("renders revenue chart with default period", () => {
    render(<RevenueChart />);

    // Check if the chart title is rendered
    expect(screen.getByText("Revenue")).toBeInTheDocument();

    // Check if the default period (Last 7 days) is selected
    expect(screen.getAllByTestId("period-selector")[0]).toHaveTextContent(
      "Last 7 days",
    );

    // Check if the default value is displayed
    expect(screen.getByText("₦490,000.00")).toBeInTheDocument();
  });

  it("changes period when buttons are clicked", () => {
    render(<RevenueChart />);

    // Click 'Today' button
    const todayButton = screen.getByText("Today");
    fireEvent.click(todayButton);
    expect(screen.getByText("₦120,000.00")).toBeInTheDocument();

    // Click 'Last 30 days' button
    const last30DaysButton = screen.getByText("Last 30 days");
    fireEvent.click(last30DaysButton);
    expect(screen.getByText("₦124,590,000.00")).toBeInTheDocument();
  });

  it("changes period when select is changed", () => {
    render(<RevenueChart />);

    // Open the select dropdown using the testid - get the first one (desktop version)
    const selectTrigger = screen.getAllByTestId("period-selector")[0];
    fireEvent.click(selectTrigger);

    // Select 'Today' option using testid
    const todayOption = screen.getByTestId("today-option");
    fireEvent.click(todayOption);
    expect(screen.getByText("₦120,000.00")).toBeInTheDocument();
  });
});
