import React from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
// import { EditIcon } from "./EditIcon";
// import { DeleteIcon } from "./DeleteIcon";
// import { EyeIcon } from "./EyeIcon";
import { columns, users } from "./data";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function RecentOrders() {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg" }}
            // description={user.email}
            name={cellValue}
          >
            {/* {user.email} */}
          </User>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
