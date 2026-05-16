import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  fetchOrderDetail,
  fetchOrdersByUser,
  updateOrderStatus,
} from "../historique.api";
import {
  parseOrderResponse,
  parseOrdersResponse,
} from "../historique.schemas";

export const useHistoriqueOrders = ({ status, userId, t }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadOrders = useCallback(async () => {
    if (status !== "authenticated" || !userId) return;

    setIsLoading(true);
    try {
      const payload = await fetchOrdersByUser(userId);
      const parsed = parseOrdersResponse(payload);
      if (!parsed.success) {
        console.error("Invalid orders response", parsed.error);
        toast.error(t("failedToFetchData"));
        setOrders([]);
        return;
      }
      setOrders(parsed.data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
      toast.error(t("failedToFetchData"));
    } finally {
      setIsLoading(false);
    }
  }, [status, t, userId]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const openOrderDetail = useCallback(
    async (orderId) => {
      setIsLoadingDetail(true);
      try {
        const payload = await fetchOrderDetail(orderId);
        const parsed = parseOrderResponse(payload);
        if (!parsed.success) {
          console.error("Invalid order response", parsed.error);
          toast.error(t("failedToFetchData"));
          return;
        }
        setSelectedOrder(parsed.data);
        setIsModalOpen(true);
      } catch (error) {
        console.error("Failed to fetch order detail", error);
        toast.error(t("failedToFetchData"));
      } finally {
        setIsLoadingDetail(false);
      }
    },
    [t]
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const updateStatus = useCallback(
    async (payload) => {
      setIsLoading(true);
      try {
        await updateOrderStatus(payload);
        toast.success(t("statusUpdated"));
        setIsModalOpen(false);
        loadOrders();
      } catch (error) {
        console.error("Failed to update status", error);
        toast.error(t("failedToUpdateStatus"));
      } finally {
        setIsLoading(false);
      }
    },
    [loadOrders, t]
  );

  return {
    orders,
    isLoading,
    isLoadingDetail,
    selectedOrder,
    isModalOpen,
    setIsModalOpen,
    openOrderDetail,
    closeModal,
    updateStatus,
    refreshOrders: loadOrders,
  };
};
