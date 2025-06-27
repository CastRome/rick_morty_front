// OptionGroup.jsx
import React from "react";

/**
 * OptionGroup renders a group of selectable options as buttons.
 * @param {string} label - The label for the option group.
 * @param {string} name - The name of the filter.
 * @param {Array} options - Array of { value, label } for each option.
 * @param {string} selectedValue - The currently selected value.
 * @param {function} onChange - Callback when an option is selected.
 */
function OptionGroup({ label, name, options, selectedValue, onChange }) {
  return (
    <div className="flex flex-col">
      <span className="mb-2 text-sm font-medium text-gray-500">{label}</span>
      <div className="flex flex-row gap-2 md:max-w-[375px]">
        {options.map(({ value, label }) => {
          const selected = value === selectedValue;
          return (
            <button
              key={value}
              type="button"
              className={`h-11 w-[102px] px-3 rounded border text-sm font-medium transition text-center
                ${
                  selected
                    ? "bg-primary-100 text-primary-600 border-primary-600"
                    : "bg-white text-black border border-gray-500 hover:bg-gray-100"
                }
              `}
              onClick={() => onChange(name, value)}
              aria-pressed={selected}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default OptionGroup;