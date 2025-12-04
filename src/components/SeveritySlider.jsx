import { useState } from "react";

export default function SeveritySlider({ value, onChange }) {
  const SEVERITY_MAP = {
    0: "P0",
    1: "P1",
    2: "P2",
  };

  const LABELS = ["P0 - HIGHEST", "P1 - MEDIUM", "P2 - LOWEST"];

  const COLORS = {
    0: "shadow-red-400 text-red-500",
    1: "shadow-yellow-400 text-yellow-500",
    2: "shadow-green-400 text-green-600",
  };

  const [index, setIndex] = useState(
    value === "P0" ? 0 : value === "P1" ? 1 : 2
  );

  function handleSlide(e) {
    const newIndex = Number(e.target.value);
    setIndex(newIndex);
    onChange(SEVERITY_MAP[newIndex]); // sends P0/P1/P2 to parent
  }

  return (
    <div className="w-full">
      <label className="block text-gray-700 font-medium mb-1">Severity</label>

      <div className="relative w-full flex flex-col items-center">
        {/* Glowing slider */}
        <input
          type="range"
          min="0"
          max="2"
          step="1"
          value={index}
          onChange={handleSlide}
          className={`w-full cursor-pointer accent-blue-600 rounded-lg 
            transition-all duration-300 shadow-lg ${COLORS[index]}
          `}
        />

        {/* Points under slider */}
        <div className="flex justify-between w-full mt-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`text-sm transition-all ${
                index === i ? `${COLORS[i]} font-semibold` : "text-gray-500"
              }`}
            >
              {LABELS[i]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
