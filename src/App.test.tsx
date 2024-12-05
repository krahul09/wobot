import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  test("renders the CameraTable component", () => {
    render(<App />);

    // Check if the heading is displayed
    const heading = screen.getByText(/Cameras/i);
    expect(heading).toBeInTheDocument();
  });

  test("renders the search bar", () => {
    render(<App />);

    // Check if the search bar is present
    const searchInput = screen.getByPlaceholderText(/search/i);
    expect(searchInput).toBeInTheDocument();

    // Simulate typing in the search bar
    fireEvent.change(searchInput, { target: { value: "Camera 1" } });
    expect(searchInput).toHaveValue("Camera 1");
  });

  test("renders pagination controls", () => {
    render(<App />);

    // Check for pagination controls
    const nextButton = screen.getByText(/Next/i);
    const previousButton = screen.getByText(/Previous/i);

    expect(nextButton).toBeInTheDocument();
    expect(previousButton).toBeInTheDocument();
  });

  test("displays camera data after API fetch", async () => {
    render(<App />);

    // Wait for the data to load and check for a camera name
    const cameraRow = await screen.findByText(/Camera 1/i);
    expect(cameraRow).toBeInTheDocument();
  });

  test("toggles status when clicked", async () => {
    render(<App />);

    // Wait for the data to load
    const statusButton = await screen.findByText(/Active/i);

    // Check if the status toggle works
    fireEvent.click(statusButton);
    expect(statusButton).toHaveTextContent(/Inactive/i);
  });

  test("deletes a camera entry", async () => {
    render(<App />);

    // Wait for the data to load
    const deleteButton = await screen.findAllByRole("button", {
      name: /delete/i,
    });

    // Simulate deletion
    fireEvent.click(deleteButton[0]);

    // Ensure the deleted camera is no longer in the document
    const deletedRow = screen.queryByText(/Camera 1/i);
    expect(deletedRow).not.toBeInTheDocument();
  });
});
