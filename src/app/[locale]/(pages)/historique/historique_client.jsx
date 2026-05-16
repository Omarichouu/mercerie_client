"use client";

import { useLocale, useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { Link } from "i18n/navigation";

import HistoryEmpty from "./components/HistoryEmpty";
import HistoryFilters from "./components/HistoryFilters";
import HistoryHeader from "./components/HistoryHeader";
import HistoryList from "./components/HistoryList";
import HistoryModal from "./components/HistoryModal";
import HistoryPagination from "./components/HistoryPagination";
import { useHistoriqueFilters } from "./hooks/useHistoriqueFilters";
import { useHistoriqueOrders } from "./hooks/useHistoriqueOrders";

const HistoriqueClient = () => {
  const { data: session, status } = useSession();
  const t = useTranslations("historique");
  const locale = useLocale();
  const userId = session?.user?._id;

  const {
    orders,
    isLoading,
    isLoadingDetail,
    selectedOrder,
    isModalOpen,
    openOrderDetail,
    closeModal,
    updateStatus,
  } = useHistoriqueOrders({ status, userId, t });

  const {
    filterStatus,
    setFilterStatus,
    filterDate,
    setFilterDate,
    currentPage,
    setCurrentPage,
    currentOrders,
    totalPages,
  } = useHistoriqueFilters(orders);

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] dark:bg-gray-900 px-2">
        <p className="text-[14px] md:text-[16px] text-center dark:text-white">
          {t("loginToViewContent")}{" "}
          <Link
            href="/login"
            className="text-red-500 dark:text-red-400 font-bold cursor-pointer"
          >
            {t("login")}
          </Link>{" "}
        </p>
      </div>
    );
  }

  return (
    <div className="border py-[3rem] px-6 dark:bg-gray-900 dark:border-gray-700">
      <HistoryHeader title={t("history")} />

      <HistoryFilters
        t={t}
        filterStatus={filterStatus}
        filterDate={filterDate}
        onStatusChange={setFilterStatus}
        onDateChange={setFilterDate}
      />

      {isLoading ? null : currentOrders.length === 0 ? (
        <HistoryEmpty message={t("empty")} />
      ) : (
        <HistoryList
          orders={currentOrders}
          locale={locale}
          t={t}
          onViewDetails={openOrderDetail}
        />
      )}

      <HistoryPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <HistoryModal
        isOpen={isModalOpen}
        isLoading={isLoadingDetail}
        order={selectedOrder}
        locale={locale}
        t={t}
        onClose={closeModal}
        onMarkReceived={(orderId) =>
          updateStatus({ _id: orderId, status: "recu" })
        }
      />
    </div>
  );
};

export default HistoriqueClient;
