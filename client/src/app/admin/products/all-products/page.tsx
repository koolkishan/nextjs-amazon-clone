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
  User,
  Pagination,
  Selection,
  SortDescriptor,
  Tooltip,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

import { columns } from "./data";
import { FaEdit, FaPlus, FaSearch, FaTrashAlt } from "react-icons/fa";
import { deleteProduct, getAllProducts } from "@/lib/api/products";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/store";

type User = any;

type Product = {
  category: {
    id: string;
  };
  order: {
    id: string;
  }[];
  colors: string[];
  createdAt: string;
  description: string[];
  discountPrice: number;
  id: string;
  images: string[];
  salePrice: number;
  title: string;
  updatedAt: string;
  variants: string[];
  _count: { order: number };
};

export default function Page() {
  const router = useRouter();
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = columns;
  const [products, setProducts] = useState<Product[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteId, setdeleteId] = useState<string | undefined>(undefined);
  const { setToast } = useAppStore();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
      if (response) {
        setProducts(response);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = React.useCallback(
    (product: Product) => {
      if (product?._count?.order > 0) {
        setToast("Cannot delete product with orders.");
      } else {
        setdeleteId(product.id);
        onOpen();
      }
    },
    [setToast, setdeleteId, onOpen]
  );

  const confirmDelete = async () => {
    const response = await deleteProduct(deleteId as string);
    if (response) {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== deleteId)
      );
      setToast("Product deleted successfully.");
    } else setToast("Unable to delete product.");
    onClose();
  };

  const filteredItems = React.useMemo(() => {
    let filteredproducts = [...products];

    if (hasSearchFilter) {
      filteredproducts = filteredproducts.filter((product) =>
        product.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredproducts;
  }, [products, hasSearchFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (user: Product, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof Product];

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex justify-start items-center gap-5">
              <Tooltip content="Edit Product" color="default">
                <span
                  className="text-lg text-blue-400 cursor-pointer active:opacity-50"
                  onClick={() =>
                    router.push(`/admin/products/edit-product/${user.id}`)
                  }
                >
                  <FaEdit />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete Product">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <FaTrashAlt onClick={() => handleDelete(user)} />
                </span>
              </Tooltip>
            </div>
          );
        case "_count":
          return <>{cellValue.order}</>;
        default:
          return <>{cellValue}</>;
      }
    },
    [handleDelete]
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
              onClick={() => router.push("/admin/products/add-product")}
            >
              Add New Product
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {products.length} products
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
    onSearchChange,
    products.length,
    onRowsPerPageChange,
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
          wrapper: "max-h-[382px]",
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
        <TableBody emptyContent={"No products found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
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
                Are you sure you want to delete the product?
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
