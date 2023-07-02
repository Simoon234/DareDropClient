import { PaginationI } from "../types/types";

function Pagination({
  totalPages,
  handleChangePageNext,
  handleChangePagePrev,
  handleSetItemsOnPage,
  page,
}: PaginationI) {
  return (
    <div className="flex items-center justify-between p-2">
      <div className="relative">
        <button
          disabled={page <= 1}
          aria-label="prev"
          onClick={handleChangePagePrev}
          className={`mr-2 cursor-not-allowed bg-indigo-500 text-white p-3 rounded ${
            page <= 1 ? "opacity-25" : "cursor-pointer"
          }`}
        >
          Prev
        </button>
        <button
          onClick={handleChangePageNext}
          className={`mr-2 cursor-not-allowed bg-indigo-500 text-white p-3 rounded ${
            totalPages === page || totalPages < page
              ? "opacity-25"
              : "cursor-pointer"
          }`}
        >
          Next
        </button>
      </div>
      <div className="flex items-center">
        <select
          onChange={handleSetItemsOnPage}
          className="flex items-center mr-10 bg-indigo-500 text-white justify-end w-max"
        >
          <option value="">Items on page</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
        <span className="text-white">
          [ Page {page} of {totalPages} ]
        </span>
      </div>
    </div>
  );
}

export default Pagination;
