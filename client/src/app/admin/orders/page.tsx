"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  User,
  Pagination,
  Selection,
  SortDescriptor,
  Tooltip,
} from "@nextui-org/react";

import { FaEye, FaSearch } from "react-icons/fa";

import { getAllOrders } from "@/lib/api/orders";
import { useRouter } from "next/navigation";

// type User = any;

interface Status {
  paymentMode: string;
}

interface User {
  id: string;
  username: string;
}

interface Count {
  products: number;
}

interface OrdersType {
  createdAt: string;
  id: string;
  paymentIntent: string;
  paymentStatus: boolean;
  price: number;
  status: Status;
  updatedAt: string;
  user: User;
  _count: Count;
}

const columns = [
  { name: "Order ID", uid: "id" },
  { name: "User", uid: "user" },
  { name: "Products", uid: "_count" },
  { name: "Price", uid: "price", sortable: true },
  { name: "Order Date", uid: "createdAt" },
  { name: "Payment Type", uid: "status" },
  { name: "Payment Status", uid: "paymentStatus", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export default function Page() {
  const router = useRouter();
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "price",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const [orders, setOrders] = useState<OrdersType[]>([]);
  useEffect(() => {
    const getOrders = async () => {
      const response = await getAllOrders();

      setOrders(response.reverse());
    };
    getOrders();
  }, []);

  const headerColumns = columns;

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...orders];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.id.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [orders, hasSearchFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: OrdersType, b: OrdersType) => {
      const first = a[sortDescriptor.column as keyof OrdersType] as number;
      const second = b[sortDescriptor.column as keyof OrdersType] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (order: OrdersType, columnKey: React.Key) => {
      const cellValue = order[columnKey as keyof OrdersType];

      switch (columnKey) {
        case "user":
          const user = cellValue as User;
          return user.username;
        case "_count":
          const count = cellValue as Count;
          return count.products;
        case "createdAt":
          return (cellValue as string).split("T")[0];
        case "status":
          const status = cellValue as Status;
          return (
            <Chip
              className="capitalize"
              color={status.paymentMode === "stripe" ? "secondary" : "success"}
              size="sm"
              variant="flat"
            >
              {status.paymentMode === "stripe" ? "Stripe" : "Cash on delivery"}
            </Chip>
          );
        case "paymentStatus":
          return (
            <Chip
              className="capitalize"
              color={(cellValue as boolean) ? "success" : "danger"}
              size="sm"
              variant="flat"
            >
              {(cellValue as boolean) ? "Completed" : "Pending"}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-start items-center gap-2">
              <Tooltip color="primary" content="View Order">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  className=""
                  color="primary"
                  onClick={() => router.push(`/admin/orders/${order.id}`)}
                >
                  <FaEye />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return <>{cellValue}</>;
      }
    },
    [router]
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by order id..."
            startContent={<FaSearch />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {orders.length} Orders
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    orders.length,
    onRowsPerPageChange,
    onClear,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [
    selectedKeys,
    filteredItems.length,
    page,
    pages,
    onPreviousPage,
    onNextPage,
  ]);

  return (
    <div className="p-10">
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "h-[600px]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No orders found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
