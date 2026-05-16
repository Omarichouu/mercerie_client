import { STATUS_OPTIONS } from "../historique.constants";

const HistoryFilters = ({
  t,
  filterStatus,
  filterDate,
  onStatusChange,
  onDateChange,
}) => (
  <div className="flex flex-col md:flex-row gap-4 mb-6">
    <select
      className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      value={filterStatus}
      onChange={(event) => onStatusChange(event.target.value)}
    >
      {STATUS_OPTIONS.map((option) => (
        <option key={option.value || "all"} value={option.value}>
          {t(option.labelKey)}
        </option>
      ))}
    </select>

    <input
      type="date"
      id="select_date"
      className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      value={filterDate}
      onChange={(event) => onDateChange(event.target.value)}
    />
  </div>
);

export default HistoryFilters;
