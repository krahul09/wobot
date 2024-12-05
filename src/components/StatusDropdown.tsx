import React, { useState } from "react";

type StatusDropdownProps = {
  onStatusChange: (value: string) => void;
};

const StatusDropdown: React.FC<StatusDropdownProps> = ({ onStatusChange }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("Status");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const options = [
    {
      value: "Status",
      label: "Status",
      icon: (
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
            d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
          />
        </svg>
      ),
    },
    {
      value: "Active",
      label: "Active",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 text-green-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
          />
        </svg>
      ),
    },
    {
      value: "Inactive",
      label: "Inactive",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 text-red-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
          />
        </svg>
      ),
    },
  ];

  const handleOptionClick = (value: string) => {
    setSelectedStatus(value);
    setIsDropdownOpen(false);
    onStatusChange(value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <button
        className="px-4 py-2 border rounded w-full flex items-center justify-between text-sm"
        onClick={toggleDropdown}
      >
        <div className="flex items-center gap-2">
          {options.find((option) => option.value === selectedStatus)?.icon}
          <span>{selectedStatus}</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 text-gray-500"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isDropdownOpen && (
        <ul className="absolute left-0 top-12 bg-white border rounded shadow-md w-full z-10 text-xs">
          {options.map((option) => (
            <li
              key={option.value}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.icon}
              <span>{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StatusDropdown;
