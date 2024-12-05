import React, { useState, useEffect } from "react";
import Table, { Column } from "../components/Table";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import LocationDropdown from "../components/LocationDropdown";
import StatusDropdown from "../components/StatusDropdown";

const CameraTable: React.FC = () => {
  const [filteredCameras, setFilteredCameras] = useState<any[]>([]);
  const [status, setStatus] = useState<string>("Status");
  const [cameraData, setCameraData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [totalItems, setTotalItems] = useState<number>(0);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchCameras();
  }, [currentPage, status, searchQuery, selectedLocation]);

  const fetchCameras = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        ...(searchQuery && { search: searchQuery }),
        ...(status !== "Status" && { status }),
        ...(selectedLocation && { location: selectedLocation }),
      });

      const response = await fetch(
        `https://api-app-staging.wobot.ai/app/v1/fetch/cameras?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer 4ApVMIn5sTxeW7GQ5VWeWiy`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error fetching cameras: ${errorData.message || "Unknown error"}`
        );
      }

      const data = await response.json();

      if (data && data.data) {
        setCameraData(data.data);
        setTotalItems(data.total || 0);
      } else {
        console.error("Invalid data format:", data);
        setCameraData([]);
        setTotalItems(0);
      }
    } catch (error) {
      console.error("Error occurred while fetching cameras:", error);
      setCameraData([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [cameraData, status, searchQuery, selectedLocation]);

  const applyFilters = () => {
    let filtered = cameraData;
    console.log(filtered);

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((camera) => {
        const nameMatch = camera.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const locationMatch = camera.location
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const recorderMatch = camera.recorder
          ? camera.recorder.toLowerCase().includes(searchQuery.toLowerCase())
          : false;

        return nameMatch || locationMatch || recorderMatch;
      });
    }

    // Filter by status
    if (status && status !== "Status") {
      filtered = filtered.filter((camera) => camera.status === status);
    }

    // Filter by location
    if (selectedLocation) {
      filtered = filtered.filter(
        (camera) => camera.location === selectedLocation
      );
    }

    setFilteredCameras(filtered);
  };

  const handleStatusChange = (selectedStatus: string) => {
    setStatus(selectedStatus);
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleDelete = (id: number) => {
    const updatedCameras = cameraData.filter((camera) => camera.id !== id);
    setCameraData(updatedCameras);
    setFilteredCameras(updatedCameras);
  };

  const handleStatusToggle = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    try {
      const response = await fetch(
        "https://api-app-staging.wobot.ai/app/v1/update/camera/status",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 4ApVMIn5sTxeW7GQ5VWeWiy`,
          },
          body: JSON.stringify({ id, status: newStatus }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        setCameraData((prevData) =>
          prevData.map((camera) =>
            camera.id === id ? { ...camera, status: newStatus } : camera
          )
        );
      } else {
        console.error("Failed to update status:", responseData);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const uniqueLocations = Array.from(
    new Set(cameraData.map((camera) => camera.location))
  );

  const totalPages = Math.ceil(filteredCameras.length / itemsPerPage);
  const currentItems = filteredCameras.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns: Column[] = [
    { header: "NAME", accessor: "name" },
    {
      header: "HEALTH",
      accessor: "health",
      render: (data) => (
        <>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.5 0 0 0 2.25 15Z"
                />
              </svg>
              <span
                className={`px-2 py-1 rounded-full text-sm font-semibold ${
                  data.health.cloud === "A"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {data.health.cloud}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z"
                />
              </svg>
              <span
                className={`px-2 py-1 rounded-full text-sm font-semibold ${
                  data.health.device === "A"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {data.health.device}
              </span>
            </div>
          </div>
        </>
      ),
    },

    { header: "LOCATION", accessor: "location" },
    {
      header: "RECORDER",
      accessor: "recorder",
      render: (data) => {
        return data.recorder ? data.recorder : "N/A";
      },
    },
    {
      header: "TASKS",
      accessor: "tasks",
      render: (data) => {
        const tasksCount = parseInt(data.tasks, 10);
        if (tasksCount === 0) {
          return <span>N/A</span>;
        }
        return (
          <span>{tasksCount === 1 ? "1 Task" : `${tasksCount} Tasks`}</span>
        );
      },
    },

    {
      header: "STATUS",
      accessor: "status",
      render: (data) => {
        const { status, id } = data;
        return (
          <button
            className={`px-4 py-1 rounded ${
              status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => handleStatusToggle(id, status)}
          >
            {status}
          </button>
        );
      },
    },
    {
      header: "ACTIONS",
      accessor: "actions",
      render: (data) => (
        <button className="text-red-500" onClick={() => handleDelete(data.id)}>
          ⨉
        </button>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-2">Cameras</h1>
      <p className="text-gray-600 mb-6">Manage your cameras here.</p>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <LocationDropdown
            locations={uniqueLocations}
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
          />
          <StatusDropdown onStatusChange={handleStatusChange} />
        </div>
        <Search onSearch={handleSearch} />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Table columns={columns} data={currentItems} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredCameras.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default CameraTable;
