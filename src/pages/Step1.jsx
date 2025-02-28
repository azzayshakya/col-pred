import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useGameStore from '../store/useGameStore';

const Step1 = () => {
  const [numPlayers, setNumPlayers] = useState('');
  const navigate = useNavigate();
  const setPlayers = useGameStore((state) => state.setPlayers);

  const handleNext = () => {
    if (numPlayers < 1 || numPlayers > 4) {
      toast.error('Please select between 1 and 4 players.');
      return;
    }
    const players = Array.from({ length: numPlayers }, () => ({ name: '', color: '' }));
    setPlayers(players);
    navigate('/step2');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">Select Number of Players</h2>
      <input
        type="number"
        min="1"
        max="4"
        value={numPlayers}
        onChange={(e) => setNumPlayers(e.target.value)}
        className="border border-gray-300 p-2 rounded mb-4"
        placeholder="Enter number of players"
      />
      <button
        onClick={handleNext}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Step1;
