import React from "react";

export interface Column {
  header: string;
  accessor: string;
  render?: (data: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <table className="w-full border-collapse table-auto">
      <thead>
        <tr className="bg-gray-100">
          {columns.map((column, index) => (
            <th
              key={index}
              className="text-left px-4 py-2 text-gray-500 font-medium"
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-sm">
        {" "}
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-b hover:bg-gray-50 transition">
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="px-4 py-2 text-gray-600">
                {column.render
                  ? column.render({ ...row, id: row.id })
                  : row[column.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
