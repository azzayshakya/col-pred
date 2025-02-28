import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useGameStore from '../store/useGameStore';

const colors = [
  { id: 1, hex: '#FF0000', name: 'Red' },
  { id: 2, hex: '#00FF00', name: 'Green' },
  { id: 3, hex: '#0000FF', name: 'Blue' },
  { id: 4, hex: '#FFFF00', name: 'Yellow' },
  { id: 5, hex: '#FF00FF', name: 'Magenta' },
  { id: 6, hex: '#00FFFF', name: 'Cyan' },
  { id: 7, hex: '#FFA500', name: 'Orange' },
  { id: 8, hex: '#800080', name: 'Purple' },
  { id: 9, hex: '#008080', name: 'Teal' },
  { id: 10, hex: '#FFC0CB', name: 'Pink' }
];

const Step3 = () => {
  const navigate = useNavigate();
  const { selectedColors, setSelectedColors, setCurrentStep } = useGameStore();
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    // Set default selection for the first 5 colors
    if (selectedColors.length === 0) {
      const defaultSelection = colors.slice(0, 5).map(c => c.hex);
      setSelected(defaultSelection);
    } else {
      setSelected(selectedColors);
    }
  }, [selectedColors]);

  const handleColorSelect = (color) => {
    if (selected.includes(color)) {
      setSelected(selected.filter(c => c !== color));
    } else {
      setSelected([...selected, color]);
    }
  };

  const handleNext = () => {
    if (selected.length < 5) {
      toast.error('Select at least 5 colors.');
      return;
    }
    setSelectedColors(selected);
    setCurrentStep(4);
    navigate('/step4');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <h2 className="text-3xl font-bold mb-4">Select Colors</h2>
      <p className="mb-4">Choose at least 5 colors for the game:</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {colors.map((color) => (
          <label key={color.id} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              value={color.hex}
              checked={selected.includes(color.hex)}
              onChange={() => handleColorSelect(color.hex)}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <div
              className="w-10 h-10 rounded-full"
              style={{ backgroundColor: color.hex }}
            ></div>
            <span>{color.name}</span>
          </label>
        ))}
      </div>
      <button
        onClick={handleNext}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Step3;
