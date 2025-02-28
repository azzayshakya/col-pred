import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useGameStore from '../store/useGameStore';

const Step2 = () => {
  const navigate = useNavigate();
  const { players, updatePlayerName } = useGameStore();

  // If no players are set, redirect back to Step1
  if (!players || players.length === 0) {
    navigate('/step1');
    return null;
  }

  const handleNext = () => {
    // Check if all player names are filled
    const isValid = players.every(player => player.name.trim() !== '');
    
    if (!isValid) {
      toast.error('Please enter names for all players');
      return;
    }
    
    navigate('/step3');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Enter Player Names</h2>
      
      <div className="space-y-4 w-full max-w-md">
        {players.map((player, index) => (
          <div key={index} className="flex items-center">
            <label className="w-32">Player {index + 1}:</label>
            <input
              type="text"
              value={player.name}
              onChange={(e) => updatePlayerName(index, e.target.value)}
              className="border border-gray-300 p-2 rounded flex-grow"
              placeholder={`Enter name for Player ${index + 1}`}
            />
          </div>
        ))}
      </div>
      
      <button
        onClick={handleNext}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-6"
      >
        Next
      </button>
    </div>
  );
};

export default Step2;