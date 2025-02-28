// Let's update Step2 as well
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useGameStore from '../store/useGameStore';
import Navbar from '../components/navbar';

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
    <div className="min-h-screen pt-16 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <Navbar/>
      <div className="max-w-md mx-auto p-6">
        <div className="bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Player Names
          </h2>
          
          <div className="space-y-4 mb-8">
            {players.map((player, index) => (
              <div key={index} className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm">
                    {index + 1}
                  </div>
                </div>
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) => updatePlayerName(index, e.target.value)}
                  className="bg-gray-700 text-white border border-gray-600 rounded-lg pl-12 pr-3 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={`Player ${index + 1} name`}
                />
              </div>
            ))}
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

export default Step2;
