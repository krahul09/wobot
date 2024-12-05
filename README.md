This project is a simple React-based camera management app that allows users to view a list of cameras, filter them by location, status, or name, and delete cameras from the list. The data is fetched from an API and displayed in a table with various filtering and search capabilities.

Features
Display Camera Data: Fetches and displays a list of cameras with details like name, health status, location, recorder, and tasks.
Search Functionality: Allows users to search cameras by name.
Location Filter: Users can filter cameras by their location.
Status Filter: Cameras can be filtered based on their active/inactive status.
Delete Functionality: Users can delete cameras from the list.
Error Handling: Gracefully handles API errors and empty data states.
Technologies Used
React: A JavaScript library for building user interfaces.
TypeScript: A superset of JavaScript that provides static typing.
React Testing Library: For unit testing and DOM testing of React components.
Jest: A testing framework for running and asserting test cases.
CSS (Tailwind CSS): For styling the application.
Setup and Installation
To run this project locally, follow these steps:

Prerequisites
Node.js and npm: Ensure that you have Node.js and npm installed. You can download Node.js from here.
Steps to run the project
Clone the repository:

bash
git clone https://github.com/krahul09/wobot
cd wobot
Install dependencies:

Run the following command to install the required dependencies:

bash
npm install
Start the development server:

Once the dependencies are installed, you can start the development server with:

bash
npm start
This will run the app at http://localhost:3000/.

Run tests:

To run the test suite for this project, use the following command:

bash
npm test
This will execute all the tests and display the results.

Functionalities
Camera Data Fetching
The app fetches camera data from an API. This is handled by the fetchData function, which retrieves the camera list and sets it in the state. It also handles loading and error states.

const fetchData = async () => {
  setLoading(true);
  try {
    const response = await fetch("https://api-app-staging.wobot.ai/app/v1/fetch/cameras");
    const data = await response.json();
    setCameras(data);
  } catch (error) {
    setError("Error fetching cameras");
  } finally {
    setLoading(false);
  }
};

Purpose: This function fetches the camera data from the API and updates the component's state accordingly.
How it works:
It sets the loading state to true while the fetch request is in progress.
Once the data is fetched successfully, it updates the cameras state.
If an error occurs, it sets an error message in the state.
Finally, it sets the loading state to false to stop the loading spinner.
Search Functionality
The search functionality allows users to filter cameras by name. This is implemented using the handleSearch function.


const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSearchQuery(event.target.value);
  const filtered = cameras.filter((camera) =>
    camera.name.toLowerCase().includes(event.target.value.toLowerCase())
  );
  setFilteredCameras(filtered);
};

Purpose: This function filters the camera list based on the search query.
How it works:
It listens to changes in the search input field.
It filters the camera list by checking if the camera name includes the search query (case-insensitive).
The filtered list is then set in the state to update the UI.
Location Filter
The location filter allows users to filter cameras based on their location. This functionality is implemented in the handleLocationFilter function.

const handleLocationFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setLocationFilter(event.target.value);
  const filtered = cameras.filter((camera) =>
    camera.location.toLowerCase().includes(event.target.value.toLowerCase())
  );
  setFilteredCameras(filtered);
};

Purpose: This function filters cameras by location.
How it works:
It listens for changes in the location filter dropdown.
It filters the camera list by checking if the camera’s location matches the selected filter.
The filtered list is updated in the state.
Status Filter
The status filter allows users to filter cameras by their active/inactive status. This is implemented in the handleStatusFilter function.


const handleStatusFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setStatusFilter(event.target.value);
  const filtered = cameras.filter((camera) => 
    camera.status.toLowerCase() === event.target.value.toLowerCase()
  );
  setFilteredCameras(filtered);
};

Purpose: This function filters cameras based on their active/inactive status.
How it works:
It listens for changes in the status filter dropdown.
It filters the cameras based on whether their status matches the selected filter (active/inactive).
The filtered cameras are then displayed in the UI.
Deleting Cameras
The delete functionality allows users to remove cameras from the list. This is implemented in the handleDelete function.

const handleDelete = (id: string) => {
  setCameras((prevCameras) => prevCameras.filter((camera) => camera.id !== id));
};

Purpose: This function removes a camera from the list based on its ID.
How it works:
It filters out the camera with the given ID from the list of cameras.
The updated list is then set in the state, causing the UI to re-render and reflect the deletion.
Error Handling and Empty State
The app gracefully handles errors and empty data states. If the fetch fails, an error message is displayed. If no cameras are returned, a message is shown indicating that no cameras are available.


if (error) {
  return <div>Error: {error}</div>;
}

if (cameras.length === 0) {
  return <div>No cameras available</div>;
}

Purpose: This logic ensures that users are informed if there is an issue fetching the camera data or if the data is empty.
How it works:
If there’s an error while fetching data, an error message is displayed.
If the fetched data is empty, a "No cameras available" message is shown.
Testing
The project includes unit tests for the key functionalities such as:

Fetching camera data
Search functionality
Filter functionality (location and status)
Deleting a camera
The tests are written using Jest and React Testing Library to ensure the components behave as expected and handle edge cases like errors and empty data.

Running Tests
To run the tests, use the following command:

bash
npm test
This will run all the tests in the project and display the results in the terminal.

Approach
State Management
The application uses React's useState hook to manage local state for the camera data, search query, selected location, and status filter. The component also manages loading and error states to ensure the UI updates based on the fetch status.

Mocking Fetch
For testing purposes, we mock the global fetch function using jest.fn(). This allows us to simulate API responses in various scenarios, including successful data retrieval, errors, and empty states.

Component Design
The app is built as a single component (CameraTable), which handles fetching the data, rendering the camera list, and managing the filters. Each camera is rendered in a row with details such as name, location, and status. The delete button is provided in each row, and clicking it removes the respective camera from the list.
