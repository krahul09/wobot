import { render, screen, fireEvent } from "@testing-library/react";
import CameraTable from "./pages/CameraTable"; // Adjust the import if necessary

// Mocking the global fetch with jest.fn()
global.fetch = jest.fn() as jest.Mock;

describe("CameraTable Component", () => {
  beforeEach(() => {
    // Reset the mock before each test
    (fetch as jest.Mock).mockReset();
  });

  it("should render the camera table and handle search, location, and status filters", async () => {
    // Mock the fetch call to return sample camera data
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: [
          {
            id: 1,
            name: "Camera 1",
            health: { cloud: "A", device: "A" },
            location: "Location 1",
            recorder: "Recorder 1",
            status: "Active",
            tasks: "1",
          },
          {
            id: 2,
            name: "Camera 2",
            health: { cloud: "A", device: "A" },
            location: "Location 2",
            recorder: "Recorder 2",
            status: "Inactive",
            tasks: "0",
          },
        ],
        total: 2,
      }),
    });

    render(<CameraTable />);

    // Check if loading text appears
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Wait for the cameras data to be rendered using findByText
    const camera1 = await screen.findByText("Camera 1");
    expect(camera1).toBeInTheDocument();

    // Test search functionality
    fireEvent.change(screen.getByPlaceholderText(/Search cameras/i), {
      target: { value: "Camera 1" },
    });

    const filteredCamera1 = await screen.findByText("Camera 1");
    expect(filteredCamera1).toBeInTheDocument();
    expect(screen.queryByText("Camera 2")).not.toBeInTheDocument();

    // Test location filter
    fireEvent.change(screen.getByTestId("location-dropdown"), {
      target: { value: "Location 1" },
    });

    const locationFilteredCamera1 = await screen.findByText("Camera 1");
    expect(locationFilteredCamera1).toBeInTheDocument();
    expect(screen.queryByText("Camera 2")).not.toBeInTheDocument();

    // Test status filter
    fireEvent.change(screen.getByTestId("status-dropdown"), {
      target: { value: "Active" },
    });

    const statusFilteredCamera1 = await screen.findByText("Camera 1");
    expect(statusFilteredCamera1).toBeInTheDocument();
    expect(screen.queryByText("Camera 2")).not.toBeInTheDocument();

    // Test delete functionality
    const deleteButton = screen.getByText("⨉");
    fireEvent.click(deleteButton);

    // Ensure the camera was removed
    expect(screen.queryByText("Camera 1")).not.toBeInTheDocument();
  });

  it("should handle API errors gracefully", async () => {
    // Mock the fetch call to simulate an error
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Error fetching cameras" }),
    });

    render(<CameraTable />);

    // Check if loading text appears
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Wait for the error state or data to be handled
    const errorText = await screen.findByText(
      "Error occurred while fetching cameras: Error fetching cameras"
    );
    expect(errorText).toBeInTheDocument();
  });

  it("should handle empty camera data gracefully", async () => {
    // Mock the fetch call to return empty camera data
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: [],
        total: 0,
      }),
    });

    render(<CameraTable />);

    // Check if loading text appears
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Wait for the empty state to be displayed
    const emptyStateText = await screen.findByText(/No cameras available/i);
    expect(emptyStateText).toBeInTheDocument();
  });

  it("should handle deleting a camera correctly", async () => {
    // Mock the fetch call to return camera data
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: [
          {
            id: 1,
            name: "Camera 1",
            health: { cloud: "A", device: "A" },
            location: "Location 1",
            recorder: "Recorder 1",
            status: "Active",
            tasks: "1",
          },
        ],
        total: 1,
      }),
    });

    render(<CameraTable />);

    // Check if loading text appears
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Wait for the cameras data to be rendered
    const camera1 = await screen.findByText("Camera 1");
    expect(camera1).toBeInTheDocument();

    // Test delete functionality
    const deleteButton = screen.getByText("⨉");
    fireEvent.click(deleteButton);

    // Wait for the camera to be removed
    expect(screen.queryByText("Camera 1")).not.toBeInTheDocument();
  });
});
