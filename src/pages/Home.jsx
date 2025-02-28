import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  const startGame = () => {
    navigate('/step1');
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-500 to-purple-600 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Color Prediction Game
        </h1>
        
        <p className="mb-6 text-gray-600">
          Challenge your friends to predict the winning color and test your luck!
        </p>
        
        <button
          onClick={startGame}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default Home;