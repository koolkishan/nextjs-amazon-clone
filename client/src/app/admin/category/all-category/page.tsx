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
  Pagination,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import { columns } from "./data";
import { FaEdit, FaPlus, FaSearch, FaTrashAlt } from "react-icons/fa";

import { deleteCategory, getAllCategories } from "@/lib/api/category";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/store";

interface Count {
  products: number;
}

interface Category {
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
  _count: Count;
}

type ValidColumnNames = keyof Category;

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteId, setdeleteId] = useState<string | undefined>(undefined);
  const { setToast } = useAppStore();

  const router = useRouter();
  useEffect(() => {
    const getData = async () => {
      const results = await getAllCategories();
      if (results) {
        setCategories(results);
      }
    };
    getData();
  }, []);

  const handleDelete = React.useCallback(
    (category: Category) => {
      if (category._count.products > 0)
        return setToast("Cannot delete category with products.");
      setdeleteId(category.id);
      onOpen();
    },
    [setToast, setdeleteId, onOpen]
  );

  const confirmDelete = async () => {
    if (deleteId) {
      const response = await deleteCategory(deleteId);
      if (response.status === 200) {
        const clonedCategories = [...categories];
        const index = clonedCategories.findIndex(
          (category) => category.id === deleteId
        );
        if (index !== -1) {
          clonedCategories.splice(index, 1);
        }
        setCategories(clonedCategories);
        setToast("Category deleted successfully.");
      } else setToast("Unable to delete category.");
    }
    onClose();
  };

  const handleEdit = React.useCallback(
    (id: string) => {
      router.push(`/admin/category/edit-category/${id}`);
    },
    [router]
  );

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string> | "all">(
    new Set()
  );

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = columns;

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...categories];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [categories, filterValue, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as ValidColumnNames];
      const second = b[sortDescriptor.column as ValidColumnNames];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (category: Category, columnKey: string) => {
      const cellValue = category[columnKey as ValidColumnNames];

      switch (columnKey) {
        case "products": {
          return <div>{category["_count"].products}</div>;
        }
        case "actions":
          return (
            <div className="relative flex justify-start items-center gap-5">
              <Tooltip content="Edit Category" color="default">
                <span className="text-lg text-blue-400 cursor-pointer active:opacity-50">
                  <FaEdit onClick={() => handleEdit(category.id)} />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete Category">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <FaTrashAlt onClick={() => handleDelete(category)} />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return <>{cellValue}</>;
      }
    },
    [handleDelete, handleEdit]
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

  const onSearchChange = React.useCallback((value: string) => {
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
            placeholder="Search by name..."
            startContent={<FaSearch />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Button
              color="primary"
              endContent={<FaPlus />}
              onClick={() => router.push("/admin/category/add-category")}
            >
              Add New Category
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {categories.length} categories
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onRowsPerPageChange,
    categories.length,
    onSearchChange,
    onClear,
    router,
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
          wrapper: "min-h-[70vh] max-h-[70vh]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor as any}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys as any}
        onSortChange={setSortDescriptor as any}
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
        <TableBody emptyContent={"No Category found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey as string)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure you want to delete the category?
              </ModalHeader>
              <ModalBody>
                <p>This action is irreversible.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onPress={confirmDelete}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
