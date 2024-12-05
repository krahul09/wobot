// Utility function to format a string
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Utility function to truncate text
export const truncate = (str: string, length: number): string => {
  return str.length > length ? str.slice(0, length) + "..." : str;
};
