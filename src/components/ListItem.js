import React from "react";

const Listdata = React.memo(({ data, style, isSelected, toggleSelect }) => {
  const formattedDate = new Date(data.date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div
      style={style}
      tabIndex={0}
      className="w-full overflow-x-auto scrollbar-hide"
    >
      <div className="min-w-[800px] flex flex-row datas-start justify-between gap-4 p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition duration-200 ease-in-out">
        <div className="flex-shrink-0 flex datas-center gap-4">
          <input
            type="checkbox"
            title={`Select ${data.title}`}
            checked={isSelected}
            onChange={() => toggleSelect(data.id)}
            className="accent-teal-600 w-5 h-5 mt-1 cursor-pointer"
          />

          <img
            src={data.avatar}
            alt={`Avatar of ${data.title}`}
            className="w-14 h-14 rounded-full border-2 border-gray-300 dark:border-gray-600 shadow-sm shrink-0"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <h3 className="font-semibold text-base text-gray-800 dark:text-gray-100 truncate">
            {data.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
            {data.subtitle}
          </p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 break-words">
            {data.description}
          </p>
        </div>

        <div className="flex flex-col datas-end gap-1 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
          <span className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
            Active
          </span>
          <span className="text-xs">📅 {formattedDate}</span>
        </div>
      </div>
    </div>
  );
});

export default Listdata;
