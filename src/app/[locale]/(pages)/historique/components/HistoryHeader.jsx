const HistoryHeader = ({ title }) => (
  <div className="flex items-center justify-center my-8">
    <div className="flex-grow h-px bg-gradient-to-r from-transparent via-or_color to-transparent max-w-xs"></div>
    <span className="mx-4 text-xl font-semibold text-or_color dark:text-or_color2 text-[1.3rem] px-3">
      {title}
    </span>
    <div className="flex-grow h-px bg-gradient-to-r from-transparent via-or_color to-transparent max-w-xs"></div>
  </div>
);

export default HistoryHeader;
