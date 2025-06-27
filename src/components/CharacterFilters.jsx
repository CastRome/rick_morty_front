import React, { useState } from "react";
import { Search, SlidersHorizontal, ChevronLeft } from "lucide-react";
import OptionGroup from "./OptionGroup";

const STATUS_OPTIONS = [
  { value: "", label: "All Status" },
  { value: "Alive", label: "Alive" },
  { value: "Dead", label: "Dead" },
  { value: "unknown", label: "Unknown" },
];
const SPECIES_OPTIONS = [
  { value: "", label: "All Species" },
  { value: "Human", label: "Human" },
  { value: "Alien", label: "Alien" },
];
const GENDER_OPTIONS = [
  { value: "", label: "All Gender" },
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "unknown", label: "Unknown" },
];
const SORT_OPTIONS = [
  { value: "ASC", label: "A-Z" },
  { value: "DESC", label: "Z-A" },
];

function CharacterFilter({ onChange, totalResults = 0, filteredResults = 0 }) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    species: "",
    gender: "",
    origin: "",
    sort: "ASC",
  });
  const [showFilters, setShowFilters] = useState(false);

  const isFiltering =
    filters.status ||
    filters.species ||
    filters.gender ||
    filters.origin.trim() !== "" ||
    filters.sort !== "ASC" ||
    query.trim() !== "";

  function applyFilters() {
    const newFilters = { ...filters, query: query.trim() };
    onChange(newFilters);
    setShowFilters(false);
  }

  function resetFilters() {
    const emptyFilters = {
      status: "",
      species: "",
      gender: "",
      origin: "",
      sort: "ASC",
    };
    setFilters(emptyFilters);
    setQuery("");
    onChange({});
    setShowFilters(false);
  }

  function handleFilterChange(name, value) {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  function handleOriginChange(e) {
    const { value } = e.target;
    setFilters((prev) => ({ ...prev, origin: value }));
  }

  function handleQueryChange(e) {
    const value = e.target.value;
    setQuery(value);
    // Call onChange with current filters and new query for live search
    onChange({ ...filters, query: value.trim() });
  }

  return (
    <div className="w-full">
      <div className="relative w-full flex items-center border rounded px-3 py-2 bg-gray-100">
        <Search className="w-4 h-4 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search or filter results"
          className="flex-1 border-0 bg-gray-100"
          value={query}
          onChange={handleQueryChange}
          aria-label="Search characters"
        />
        <button
          className="ml-2"
          onClick={() => setShowFilters(!showFilters)}
          aria-label="Show filters"
          type="button"
        >
          <SlidersHorizontal
            className={`w-5 h-5 text-primary-600 ${
              showFilters ? "bg-primary-100" : "bg-gray-200"
            }`}
          />
        </button>
      </div>

      {/* Show results and Done button if there are active filters */}
      {isFiltering && (
        <div className="mt-2 px-2 text-sm text-gray-600 flex flex-col md:flex-row md:items-center md:justify-between gap-1">
          <button
            onClick={resetFilters}
            className="text-primary-600 underline hover:text-primary-800 font-semibold"
            type="button"
          >
            Done
          </button>
        </div>
      )}

      {showFilters && (
        <>
          {/* Mobile modal background */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
            onClick={() => setShowFilters(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 bg-white z-50 p-4 overflow-auto md:static md:bg-transparent md:p-0 md:overflow-visible md:max-w-[375px]"
          >
            {/* Mobile header with Back button */}
            <div className="flex items-center mb-4 md:hidden">
              <button
                onClick={() => setShowFilters(false)}
                aria-label="Close filters"
                className="flex items-center text-blue-600 font-semibold"
                type="button"
              >
                <ChevronLeft className="w-5 h-5 mr-1" color="#8054C7" />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              <OptionGroup
                label="Status"
                name="status"
                options={STATUS_OPTIONS}
                selectedValue={filters.status}
                onChange={handleFilterChange}
              />
              <OptionGroup
                label="Species"
                name="species"
                options={SPECIES_OPTIONS}
                selectedValue={filters.species}
                onChange={handleFilterChange}
              />
              <OptionGroup
                label="Gender"
                name="gender"
                options={GENDER_OPTIONS}
                selectedValue={filters.gender}
                onChange={handleFilterChange}
              />
              <div className="flex flex-col md:max-w-[375px]">
                <label
                  htmlFor="origin"
                  className="mb-2 text-sm font-medium text-gray-500"
                >
                  Origin
                </label>
                <input
                  id="origin"
                  type="text"
                  name="origin"
                  placeholder="Filter by Origin"
                  value={filters.origin}
                  onChange={handleOriginChange}
                  className="border rounded px-3 py-2 focus:outline-none"
                />
              </div>
              <OptionGroup
                label="Sort"
                name="sort"
                options={SORT_OPTIONS}
                selectedValue={filters.sort}
                onChange={handleFilterChange}
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={applyFilters}
                disabled={!isFiltering}
                type="button"
                className={`px-4 w-full py-2 rounded font-medium transition-colors ${
                  isFiltering
                    ? "bg-primary-600 hover:bg-primary-700 text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Filter
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CharacterFilter;
