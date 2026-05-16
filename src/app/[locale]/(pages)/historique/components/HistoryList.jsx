import HistoryItem from "./HistoryItem";

const HistoryList = ({ orders, locale, t, onViewDetails }) => (
  <div className="flex flex-col">
    {orders.map((order) => (
      <HistoryItem
        key={order._id}
        order={order}
        locale={locale}
        t={t}
        onViewDetails={onViewDetails}
      />
    ))}
  </div>
);

export default HistoryList;
