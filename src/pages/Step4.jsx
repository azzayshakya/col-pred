import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useGameStore from '../store/useGameStore';

const Step4 = () => {
  const navigate = useNavigate();
  const { 
    players, 
    selectedColors, 
    updatePlayerColor,
    setWinningColor,
    winningColor,
    resetGame,
    clearAll
  } = useGameStore();
  
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameEnded, setGameEnded] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [lockedPlayers, setLockedPlayers] = useState([]);

  // If no players or colors are set, redirect back
  useEffect(() => {
    if (!players || players.length === 0) {
      navigate('/step1');
      return;
    }
    if (!selectedColors || selectedColors.length < 5) {
      navigate('/step3');
    }
  }, [players, selectedColors, navigate]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      endGame();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleLockColor = (playerIndex) => {
    if (gameEnded) return;
    if (lockedPlayers.includes(playerIndex)) {
      toast.info(`${players[playerIndex].name} already locked in a color!`);
      return;
    }

    const playerColor = players[playerIndex].color;
    if (!playerColor) {
      toast.error('Please select a color first!');
      return;
    }

    setLockedPlayers([...lockedPlayers, playerIndex]);
    toast.success(`${players[playerIndex].name} locked in their color!`);
  };

  const endGame = () => {
    setGameEnded(true);
    // Select random winning color from our selected colors
    const randomIndex = Math.floor(Math.random() * selectedColors.length);
    const winningColorValue = selectedColors[randomIndex];
    setWinningColor(winningColorValue);
    
    // Wait a moment before showing results
    setTimeout(() => {
      setShowResults(true);
    }, 1000);
  };

  const handlePlayAgain = () => {
    resetGame();
    setTimeLeft(10);
    setGameEnded(false);
    setShowResults(false);
    setLockedPlayers([]);
  };

  const handleExit = () => {
    clearAll();
    navigate('/');
  };

  // Determine winners
  const winners = showResults ? players.filter(
    (player, index) => lockedPlayers.includes(index) && player.color === winningColor.value
  ) : [];

  // Generate player layout based on number of players
  const getPlayerPositions = () => {
    switch (players.length) {
      case 1:
        return ['bottom'];
      case 2:
        return ['top', 'bottom'];
      case 3:
        return ['top-left', 'top-right', 'bottom'];
      case 4:
        return ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
      default:
        return [];
    }
  };

  const positions = getPlayerPositions();

  const getPositionClass = (position) => {
    switch (position) {
      case 'top':
        return 'top-10 left-1/2 transform -translate-x-1/2';
      case 'bottom':
        return 'bottom-10 left-1/2 transform -translate-x-1/2';
      case 'top-left':
        return 'top-10 left-10';
      case 'top-right':
        return 'top-10 right-10';
      case 'bottom-left':
        return 'bottom-10 left-10';
      case 'bottom-right':
        return 'bottom-10 right-10';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen relative bg-gray-100 flex justify-center items-center">
      {/* Center timer/result box */}
      <div className="absolute z-10 bg-white rounded-lg shadow-lg p-6 w-64 h-64 flex flex-col justify-center items-center">
        {!gameEnded ? (
          <>
            <h3 className="text-xl font-bold mb-2">Time Left</h3>
            <div className="text-5xl font-bold text-red-500">{timeLeft}</div>
            <p className="mt-2 text-center">Players must lock in their colors!</p>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-2">Winning Color</h3>
            <div 
              className="w-24 h-24 rounded-full border-4 border-black" 
              style={{ backgroundColor: winningColor?.value }}
            ></div>
            <p className="mt-2 font-bold">{winningColor?.name}</p>
          </>
        )}
      </div>
      
      {/* Player boxes */}
      {players.map((player, index) => (
        <div 
          key={index}
          className={`absolute ${getPositionClass(positions[index])} bg-white rounded-lg shadow-lg p-4 w-64 transition-all`}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">{player.name}</h3>
            
            {/* Status indicator */}
            {showResults && (
              <div 
                className={`w-6 h-6 rounded-full ${winners.includes(player) ? 'bg-green-500' : 'bg-red-500'}`}
              ></div>
            )}
          </div>
          
          <select
            value={player.color}
            onChange={(e) => updatePlayerColor(index, e.target.value)}
            disabled={lockedPlayers.includes(index) || gameEnded}
            className="w-full p-2 border rounded mb-2"
          >
            <option value="">Select a color</option>
            {selectedColors.map((color, i) => (
              <option key={i} value={color.value}>
                {color.name}
              </option>
            ))}
          </select>
          
          <button
            onClick={() => handleLockColor(index)}
            disabled={lockedPlayers.includes(index) || gameEnded}
            className={`w-full py-2 rounded ${
              lockedPlayers.includes(index) 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {lockedPlayers.includes(index) ? 'Locked' : 'Lock Color'}
          </button>
        </div>
      ))}
      
      {/* Results popup */}
      {showResults && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-4">Game Results</h2>
            
            {winners.length > 0 ? (
              <div className="mb-4">
                <p className="font-bold text-xl text-green-600 mb-2">
                  {winners.length === 1 ? 'Winner!' : 'Winners!'}
                </p>
                <ul className="mb-4">
                  {winners.map((winner, index) => (
                    <li key={index} className="font-bold">{winner.name}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-xl text-red-600 mb-4">No one wins!</p>
            )}
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={handlePlayAgain}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Play Again
              </button>
              <button
                onClick={handleExit}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step4;