import { useState } from "react";
import CharacterList from "../components/CharacterList";
import CharacterFilter from "../components/CharacterFilters";

function Home() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({});

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">
        Rick & Morty Character List
      </h1>

      <div className="flex justify-center mb-6">
        <CharacterFilter onChange={setFilter} />
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>

      <CharacterList page={page} filter={filter} />
    </div>
  );
}

export default Home;
