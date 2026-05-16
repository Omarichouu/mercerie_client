import { useEffect, useMemo, useState } from "react";

import { ORDERS_PER_PAGE } from "../historique.constants";
import { formatDate } from "../historique.utils";

export const useHistoriqueFilters = (orders = []) => {
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus = filterStatus
        ? order.status === filterStatus
        : true;
      const matchesDate = filterDate
        ? formatDate(order.createdAt) === formatDate(filterDate)
        : true;
      return matchesStatus && matchesDate;
    });
  }, [filterDate, filterStatus, orders]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, filterDate]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / ORDERS_PER_PAGE)
  );

  const currentOrders = useMemo(() => {
    const indexOfLastOrder = currentPage * ORDERS_PER_PAGE;
    const indexOfFirstOrder = indexOfLastOrder - ORDERS_PER_PAGE;
    return filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  }, [currentPage, filteredOrders]);

  return {
    filterStatus,
    setFilterStatus,
    filterDate,
    setFilterDate,
    currentPage,
    setCurrentPage,
    currentOrders,
    totalPages,
    filteredOrdersCount: filteredOrders.length,
  };
};
