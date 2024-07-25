import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import coursesData from "./courses.json";

const Batches = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const batches = coursesData.batches;

  const filteredBatches = batches.filter((batch) =>
    batch.title.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedBatches = filteredBatches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  return (
    <div className="batches-bg">
      <div className="flex flex-col justify-center items-center">
        <h1
          className="main-text text-4xl text-[#444B79] font-bold mb-4"
          style={{
            fontFamily: "Inter, sans-serif",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.4)",
          }}
        >
          Chai aur Code
        </h1>
        <div
          className="bg-[#F9F7F7] rounded-lg font-sans p-4 w-auto md:w-[75rem]"
          style={{
            boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.4)",
            fontFamily: "Inter, sans-serif",
          }}
        >
          <h1 className="text-[#313131] text-2xl font-bold">Batches</h1>
          <p className="text-[#4B4747] mb-4">
            Create learner’s batch and share information at the same time.
          </p>
          <div className="mb-4">
            <input
              type="text"
              value={search}
              className="bg-white placeholder-[#C8C7C7] w-[20rem] outline-none rounded-sm p-1 mr-1"
              style={{ border: "1px solid #BEBEBE" }}
              onChange={handleSearchChange}
              placeholder="Search by Title"
            />
            <button className="bg-[#6C6BAF] p-1 rounded-sm w-[5rem] text-white">
              Search
            </button>
          </div>
          <table className="min-w-full bg-white rounded-lg outline-none">
            <thead>
              <tr className="bg-[#F2F2F2]">
                <th>Title</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Price</th>
                <th>Validity/Expiry</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBatches.map((batch) => (
                <tr key={batch.id}>
                  <td
                    className="flex items-center"
                    style={{ alignItems: "left" }}
                  >
                    <img
                      src={batch.image}
                      alt={batch.title}
                      className="h-16 object-cover mr-2"
                    />
                    {batch.title}
                  </td>
                  <td>{batch.startDate}</td>
                  <td>{batch.endDate}</td>
                  <td>{batch.price}</td>
                  <td>{batch.validity}</td>
                  <td>
                    <span
                      className="p-1 rounded-sm"
                      style={{
                        border:
                          batch.status.toLowerCase() === "unpublished"
                            ? "1px solid #4B4747"
                            : "1px solid #4ED04B",
                        backgroundColor:
                          batch.status.toLowerCase() === "unpublished"
                            ? "#f0f0f0"
                            : "#DEFFDE",
                        color:
                          batch.status.toLowerCase() === "unpublished"
                            ? "#000"
                            : "#000",
                      }}
                    >
                      {batch.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-4 gap-4">
            <div className="flex items-center">
              <span className="mr-2">Rows per page:</span>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="bg-white p-1 rounded"
                style={{ border: "1px solid #BEBEBE" }}
              >
                <option value={1}>1</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
            <div className="flex items-center">
              <button
                className="p-2 rounded disabled:opacity-50 flex items-center"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <FaChevronLeft />
              </button>
              <button
                className="p-2 rounded disabled:opacity-50 flex items-center"
                disabled={currentPage * itemsPerPage >= filteredBatches.length}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Batches;
