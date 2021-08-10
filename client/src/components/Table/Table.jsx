import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useTable } from "react-table";
import { columns } from "./columns";

import "./Style/Table.css";

const Table = ({ orders }) => {
  const history = useHistory();
  const COLUMNS = useMemo(() => columns, []);
  const DATA = useMemo(() => orders, []);

  const tableInstance = useTable({
    columns: COLUMNS,
    data: DATA,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  const handleClick = (orderInfo) => {
    history.push(`/line-item/${orderInfo.orderNumber}`);
  };

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} onClick={() => handleClick(row.original)}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
