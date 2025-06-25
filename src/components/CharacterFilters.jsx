import { useState } from "react";

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

function CharacterFilter({ onChange }) {
  const [filters, setFilters] = useState({
    status: "",
    species: "",
    gender: "",
    origin: "",
    sort: "ASC",
    sortBy: "name",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    const updated = { ...filters, [name]: value };
    setFilters(updated);
    onChange(updated);
  }

  return (
    <form
      className="flex flex-wrap gap-4 mb-6 items-end"
      onSubmit={(e) => e.preventDefault()}
      aria-label="Character filters"
    >
      <div className="flex flex-col">
        <label
          htmlFor="status"
          className="mb-1 text-sm font-medium"
        >
          Status
        </label>
        <div className="relative">
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="border rounded px-3 pr-8 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            ▼
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="species"
          className="mb-1 text-sm font-medium"
        >
          Species
        </label>
        <div className="relative">
          <select
            id="species"
            name="species"
            value={filters.species}
            onChange={handleChange}
            className="border rounded px-3 pr-8 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
          >
            {SPECIES_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            ▼
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="gender"
          className="mb-1 text-sm font-medium"
        >
          Gender
        </label>
        <div className="relative">
          <select
            id="gender"
            name="gender"
            value={filters.gender}
            onChange={handleChange}
            className="border rounded px-3 pr-8 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
          >
            {GENDER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            ▼
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="origin"
          className="mb-1 text-sm font-medium"
        >
          Origin
        </label>
        <input
          id="origin"
          type="text"
          name="origin"
          placeholder="Filter by Origin"
          value={filters.origin}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="sort"
          className="mb-1 text-sm font-medium"
        >
          Sort
        </label>
        <div className="relative">
          <select
            id="sort"
            name="sort"
            value={filters.sort}
            onChange={handleChange}
            className="border rounded px-3 pr-8 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            ▼
          </span>
        </div>
      </div>
    </form>
  );
}

export default CharacterFilter;
