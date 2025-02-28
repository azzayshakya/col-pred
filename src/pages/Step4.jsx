import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGameStore from '../store/useGameStore';
import { toast } from 'react-toastify';

const Step4 = () => {
  const navigate = useNavigate();
  const { playerNames, selectedColors, resetGame } = useGameStore();
  const [playerSelections, setPlayerSelections] = useState({});
  const [isLocked, setIsLocked] = useState({});
  const [timer, setTimer] = useState(10);
  const [winner, setWinner] = useState(null);

  // Initialize player selections and locks
  useEffect(() => {
    const initialSelections = {};
    const initialLocks = {};

    playerNames.forEach((player) => {
      initialSelections[player] = '';
      initialLocks[player] = false;
    });

    setPlayerSelections(initialSelections);
    setIsLocked(initialLocks);
  }, [playerNames]);

  // Timer Logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      checkResults();
    }
  }, [timer]);

  // Handle Color Change
  const handleColorChange = (player, color) => {
    setPlayerSelections((prev) => ({
      ...prev,
      [player]: color,
    }));
  };

  // Lock Player's Color
  const handleLockColor = (player) => {
    if (playerSelections[player] === '') {
      toast.warning('Please select a color before locking!');
      return;
    }
    setIsLocked((prev) => ({
      ...prev,
      [player]: true,
    }));
    toast.success(`${player} locked their color!`);
  };

  // Check Results After Timer Ends
  const checkResults = () => {
    const colorCounts = {};
    Object.values(playerSelections).forEach((color) => {
      if (color) {
        colorCounts[color] = (colorCounts[color] || 0) + 1;
      }
    });

    const winningColor = Object.keys(colorCounts).find(
      (color) => colorCounts[color] === playerNames.length
    );

    if (winningColor) {
      const winners = playerNames.filter(
        (player) => playerSelections[player] === winningColor
      );
      setWinner(winners.length > 0 ? winners.join(', ') : 'No one');
    } else {
      setWinner('No one');
    }
  };

  // Play Again
  const handlePlayAgain = () => {
    setPlayerSelections({});
    setIsLocked({});
    setTimer(10);
    setWinner(null);
  };

  // Exit Game
  const handleExit = () => {
    resetGame();
    navigate('/');
  };

  // Redirect if no player data
  useEffect(() => {
    if (playerNames.length === 0) {
      navigate('/');
    }
  }, [playerNames, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Color Prediction Game</h2>
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl">
        <div className="text-center mb-4">
          <h3 className="text-xl">Timer: {timer} seconds</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {playerNames.map((player, index) => (
            <div key={index} className="border p-4 rounded-lg shadow">
              <h4 className="text-lg font-semibold">{player}</h4>
              <select
                value={playerSelections[player] || ''}
                onChange={(e) => handleColorChange(player, e.target.value)}
                className="border rounded p-2 mt-2 w-full"
                disabled={isLocked[player]}
              >
                <option value="">Select Color</option>
                {selectedColors.map((colorObj, idx) => (
                  <option key={idx} value={colorObj.color}>
                    {colorObj.name}
                  </option>
                ))}
              </select>
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                onClick={() => handleLockColor(player)}
                disabled={isLocked[player]}
              >
                Lock Color
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          {winner && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Result: </strong>
              <span className="block sm:inline">
                {winner === 'No one'
                  ? 'No one wins!'
                  : `Winner: ${winner}`}
              </span>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={handlePlayAgain}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Play Again
          </button>
          <button
            onClick={handleExit}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4;
