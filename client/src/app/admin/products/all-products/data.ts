import React from "react";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "title", sortable: true },
  { name: "PRICE", uid: "discountPrice", sortable: true },
  { name: "ORDERS", uid: "_count", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export { columns };
