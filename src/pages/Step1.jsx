// Updated Step1.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useGameStore from '../store/useGameStore';
import Navbar from '../components/navbar';

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
    <div className="min-h-screen pt-16 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <Navbar/>
      <div className="max-w-md mx-auto p-6">
        <div className="bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            How Many Players?
          </h2>
          
          <div className="mb-8">
            <label className="block text-gray-300 mb-2">Select number of players:</label>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map(num => (
                <button
                  key={num}
                  className={`py-4 rounded-lg font-bold transition-all transform hover:scale-105 ${
                    parseInt(numPlayers) === num
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  onClick={() => setNumPlayers(num)}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105 flex items-center justify-center"
          >
            <span className="mr-2">NEXT</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1;