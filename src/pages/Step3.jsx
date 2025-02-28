import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useGameStore from '../store/useGameStore';

const Step3 = () => {
  const navigate = useNavigate();
  const { players, availableColors, setSelectedColors } = useGameStore();
  const [selectedColorIds, setSelectedColorIds] = useState([0, 1, 2, 3, 4]); // Default 5 colors selected

  // If no players are set, redirect back to Step1
  useEffect(() => {
    if (!players || players.length === 0) {
      navigate('/step1');
    }
  }, [players, navigate]);

  const handleColorToggle = (index) => {
    if (selectedColorIds.includes(index)) {
      // Only remove if we'll still have at least 5 colors
      if (selectedColorIds.length > 5) {
        setSelectedColorIds(selectedColorIds.filter(id => id !== index));
      } else {
        toast.info('You must select at least 5 colors');
      }
    } else {
      // Only add if we'll have at most 10 colors
      if (selectedColorIds.length < 10) {
        setSelectedColorIds([...selectedColorIds, index]);
      } else {
        toast.info('You can select a maximum of 10 colors');
      }
    }
  };

  const handleNext = () => {
    if (selectedColorIds.length < 5) {
      toast.error('Please select at least 5 colors');
      return;
    }
    
    const selectedColors = selectedColorIds.map(id => availableColors[id]);
    setSelectedColors(selectedColors);
    navigate('/step4');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <h2 className="text-3xl font-bold mb-6">Select Colors (Minimum 5)</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mb-6">
        {availableColors.map((color, index) => (
          <div 
            key={index}
            onClick={() => handleColorToggle(index)}
            className={`
              cursor-pointer border-2 p-4 rounded-lg flex flex-col items-center transition-all
              ${selectedColorIds.includes(index) ? 'border-black scale-105' : 'border-gray-300 opacity-70'}
            `}
          >
            <div 
              className="w-16 h-16 rounded-full mb-2" 
              style={{ backgroundColor: color.value }}
            ></div>
            <span>{color.name}</span>
          </div>
        ))}
      </div>
      
      <div className="text-center mb-4">
        {selectedColorIds.length} of 10 colors selected
      </div>
      
      <button
        onClick={handleNext}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
      >
        Start Game
      </button>
    </div>
  );
};

export default Step3;