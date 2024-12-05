import React, { useState } from "react";

interface LocationDropdownProps {
  locations: string[];
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

const LocationDropdown: React.FC<LocationDropdownProps> = ({
  locations,
  selectedLocation,
  onLocationChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleLocationSelect = (location: string) => {
    onLocationChange(location);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-56">
      {/* Trigger Button */}
      <button
        onClick={toggleDropdown}
        className="w-full px-4 py-2 border rounded flex items-center justify-between cursor-pointer text-sm"
      >
        <span>{selectedLocation || "Location"}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full bg-white border rounded shadow text-xs">
          <li
            onClick={() => handleLocationSelect("")}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            Location
          </li>
          {locations.map((location) => (
            <li
              key={location}
              onClick={() => handleLocationSelect(location)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationDropdown;
