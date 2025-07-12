import React, { useState, useMemo, useEffect } from "react";
import UserList from "./components/UserList";
import SearchSortBar from "./components/SearchSortBar";
import axios from 'axios'

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [selectedIds, setSelectedIds] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (data.current) {
        setShowScrollTop(data.current.scrollTop > 200);
      }
    };

    const currentRef = data.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [data]);

  const filteredSortedData = useMemo(() => {
    let result = data.filter((data) =>
      data.title(searchTerm.toLowerCase())
    );
    result.sort((a, b) => {
      if (sortBy === "name") return a.title.localeCompare(b.name);
      return new Date(b.date) - new Date(a.date);
    });
    return result;
  }, [searchTerm, sortBy, data]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const deleteSelected = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedIds.length} item(s)?`
    );
    if (confirmed) {
      setData((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
      setSelectedIds([]);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 md:px-10 text-gray-800 dark:text-gray-100">
        <div className="w-full max-w-7xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 md:p-8 transition-colors duration-300">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase text-[#0C2218] dark:text-white">
              User List Items
            </h1>
          </div>

          <SearchSortBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {data.length === 0 ? (
            <EmptyState
              icon="📂"
              title="No items available"
              subtitle="Looks like there are no records in the list yet."
            />
          ) : filteredSortedData.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="No results found"
              subtitle="Try changing the search keyword or sorting option."
            />
          ) : (
            <>
              {selectedIds.length > 0 && (
                <div className="flex justify-end mb-3">
                  <button
                    onClick={deleteSelected}
                    className="w-full sm:w-auto px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md shadow transition duration-200"
                  >
                    🗑️ Delete Selected ({selectedIds.length})
                  </button>
                </div>
              )}

              <UserList
                data={filteredSortedData}
                selectedIds={selectedIds}
                toggleSelect={toggleSelect}
                outerRef={data}
              />
            </>
          )}
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={() =>
            data.current?.scrollTo({ top: 0, behavior: "smooth" })
          }
          className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
          title="Scroll to Top"
        >
          ⬆
        </button>
      )}
    </div>
  );
}

const EmptyState = ({ icon, title, subtitle }) => (
  <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-10 space-y-2">
    <span className="text-5xl">{icon}</span>
    <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
      {title}
    </h2>
    <p className="text-sm text-gray-400">{subtitle}</p>
  </div>
);

export default App;
