// And finally Step3
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useGameStore from "../store/useGameStore";
import Navbar from "../components/navbar";

const Step3 = () => {
  const navigate = useNavigate();
  const { players, availableColors, setSelectedColors } = useGameStore();
  const [selectedColorIds, setSelectedColorIds] = useState([0, 1, 2, 3, 4]); // Default 5 colors selected

  // If no players are set, redirect back to Step1
  useEffect(() => {
    if (!players || players.length === 0) {
      navigate("/step1");
    }
  }, [players, navigate]);

  const handleColorToggle = (index) => {
    if (selectedColorIds.includes(index)) {
      // Only remove if we'll still have at least 5 colors
      if (selectedColorIds.length > 5) {
        setSelectedColorIds(selectedColorIds.filter((id) => id !== index));
      } else {
        toast.info("You must select at least 5 colors");
      }
    } else {
      // Only add if we'll have at most 10 colors
      if (selectedColorIds.length < 10) {
        setSelectedColorIds([...selectedColorIds, index]);
      } else {
        toast.info("You can select a maximum of 10 colors");
      }
    }
  };

  const handleNext = () => {
    if (selectedColorIds.length < 5) {
      toast.error("Please select at least 5 colors");
      return;
    }

    const selectedColors = selectedColorIds.map((id) => availableColors[id]);
    setSelectedColors(selectedColors);
    navigate("/step4");
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <Navbar />
      <div className="max-w-xl mx-auto p-6">
        <div className="bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Select Colors
          </h2>

          <p className="text-center mb-6 text-gray-300">
            Choose 5-10 colors for your game. You already have 5 pre-selected.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {availableColors.map((color, index) => (
              <div
                key={index}
                onClick={() => handleColorToggle(index)}
                className={`
                  cursor-pointer rounded-lg p-3 transition-all transform hover:scale-105
                  ${
                    selectedColorIds.includes(index)
                      ? "bg-gray-700 border-2 border-blue-400 shadow-lg"
                      : "bg-gray-700 border border-gray-600 opacity-70"
                  }
                `}
              >
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-full mb-2 border-2 border-white"
                    style={{ backgroundColor: color.value }}
                  ></div>
                  <span className="text-sm font-medium">{color.name}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mb-6">
            <span className="inline-block bg-gray-700 px-4 py-2 rounded-full text-blue-300">
              {selectedColorIds.length} of 10 colors selected
            </span>
          </div>

          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105 flex items-center justify-center"
          >
            <span className="mr-2">START GAME</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3;
