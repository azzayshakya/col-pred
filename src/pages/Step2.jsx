import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useGameStore from '../store/useGameStore';

const Step2 = () => {
  const navigate = useNavigate();
  const { players, setPlayers, setCurrentStep } = useGameStore();
  const [playerNames, setPlayerNames] = useState(players);

  const handleNameChange = (index, value) => {
    const updatedNames = [...playerNames];
    updatedNames[index] = { ...updatedNames[index], name: value };
    setPlayerNames(updatedNames);
  };

  const handleNext = () => {
    if (playerNames.some(player => player.name.trim() === '')) {
      toast.error('Please enter names for all players.');
      return;
    }
    setPlayers(playerNames);
    setCurrentStep(3);
    navigate('/step3');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">Enter Player Names</h2>
      <div className="flex flex-col space-y-4 mb-4">
        {playerNames.map((player, index) => (
          <input
            key={index}
            type="text"
            value={player.name}
            onChange={(e) => handleNameChange(index, e.target.value)}
            placeholder={`Player ${index + 1} Name`}
            className="border border-gray-300 p-2 rounded"
          />
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

export default Step2;
