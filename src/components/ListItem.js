import React from "react";

const Listdata = React.memo(({ data, style }) => {
  if (!data) return null;

  return (
    <div style={style} tabIndex={0}>
      <div className="w-full min-w-[800px] flex flex-row items-start justify-between gap-4 p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition duration-200 ease-in-out overflow-x-auto scrollbar-hide">
        <div className="flex-shrink-0 flex items-center gap-4">
          {/* You can add an avatar or icon here if needed */}
        </div>

        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <h3 className="font-semibold text-base text-gray-800 dark:text-gray-100 truncate">
            {data.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
            {data.email}
          </p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 break-words">
            {data.address
              ? `${data.address.street}, ${data.address.suite}, ${data.address.city}, ${data.address.zipcode}`
              : ""}
          </p>
        </div>

        <div className="flex flex-col items-end gap-1 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
          <span className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
            Active
          </span>
        </div>
      </div>
    </div>
  );
});

export default Listdata;