import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useGameStore from "../store/useGameStore";
import Navbar from "../components/navbar";

const Step4 = () => {
  const navigate = useNavigate();
  const {
    players,
    selectedColors,
    updatePlayerColor,
    setWinningColor,
    winningColor,
    resetGame,
    clearAll,
  } = useGameStore();

  const [timeLeft, setTimeLeft] = useState(10);
  const [gameEnded, setGameEnded] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [lockedPlayers, setLockedPlayers] = useState([]);

  // If no players or colors are set, redirect back
  useEffect(() => {
    if (!players || players.length === 0) {
      navigate("/step1");
      return;
    }
    if (!selectedColors || selectedColors.length < 5) {
      navigate("/step3");
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
      toast.error("Please select a color first!");
      return;
    }

    setLockedPlayers([...lockedPlayers, playerIndex]);
    // toast.success(`${players[playerIndex].name} locked in their color!`);
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
    navigate("/");
  };

  // Determine winners
  const winners = showResults
    ? players.filter(
        (player, index) =>
          lockedPlayers.includes(index) && player.color === winningColor.value
      )
    : [];

  // Responsive player layout based on number of players and screen size
  const getPlayerLayout = () => {
    // For mobile view
    if (window.innerWidth < 768) {
      return (
        <div className="w-full px-4 max-w-md mx-auto mt-24 mb-20 flex flex-col gap-4">
          {players.map((player, index) => renderPlayerBox(player, index))}
        </div>
      );
    }

    // For desktop view - position players in a pattern
    return (
      <>
        {players.map((player, index) => {
          const position = getDesktopPosition(index, players.length);
          return (
            <div key={index} className={`absolute ${position}`}>
              {renderPlayerBox(player, index)}
            </div>
          );
        })}
      </>
    );
  };

  // Get desktop position classes based on player index and total players
  const getDesktopPosition = (index, totalPlayers) => {
    switch (totalPlayers) {
      case 1:
        return "bottom-4 left-1/2 transform -translate-x-1/2 md:bottom-10";
      case 2:
        return index === 0
          ? "top-24 left-1/2 transform -translate-x-1/2 md:top-10"
          : "bottom-4 left-1/2 transform -translate-x-1/2 md:bottom-10";
      case 3:
        if (index === 0)
          return "top-24 left-1/4 transform -translate-x-1/2 md:top-10 md:left-10";
        if (index === 1)
          return "top-24 right-1/4 transform translate-x-1/2 md:top-10 md:right-10";
        return "bottom-4 left-1/2 transform -translate-x-1/2 md:bottom-10";
      case 4:
        if (index === 0)
          return "top-24 left-1/4 transform -translate-x-1/2 md:top-10 md:left-10";
        if (index === 1)
          return "top-24 right-1/4 transform translate-x-1/2 md:top-10 md:right-10";
        if (index === 2)
          return "bottom-4 left-1/4 transform -translate-x-1/2 md:bottom-10 md:left-10";
        return "bottom-4 right-1/4 transform translate-x-1/2 md:bottom-10 md:right-10";
      default:
        return "";
    }
  };

  // Render an individual player box
  const renderPlayerBox = (player, index) => (
    <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-4 w-full max-w-xs mx-auto transition-all">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          {player.name}
        </h3>

        {/* Status indicator */}
        {showResults && (
          <div
            className={`w-6 h-6 rounded-full ${
              winners.includes(player) ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
        )}
      </div>

      <select
        value={player.color}
        onChange={(e) => updatePlayerColor(index, e.target.value)}
        disabled={lockedPlayers.includes(index) || gameEnded}
        className="w-full p-2 border rounded mb-2 bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
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
        className={`w-full py-2 rounded-lg font-bold transition transform hover:scale-105 ${
          lockedPlayers.includes(index)
            ? "bg-gray-600 cursor-not-allowed text-gray-400"
            : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
        }`}
      >
        {lockedPlayers.includes(index) ? "Locked" : "Lock Color"}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen pt-16 relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex justify-center items-center overflow-hidden">
      <Navbar />
      {/* main box where countdown will be shown and also reult color shown */}

      {/* Responsive container */}
      <div className="w-full relative flex flex-col items-center">
        {/* Center timer/result box */}
        <div className="z-10 bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-4 md:p-6 w-64 h-64 flex flex-col justify-center items-center mb-4 md:mb-0">
          {!gameEnded ? (
            <>
              <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Time Left
              </h3>
              <div className="text-5xl font-bold text-red-500">{timeLeft}</div>
              <p className="mt-2 text-center text-gray-300">
                Players must lock in their colors!
              </p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Winning Color
              </h3>
              <div
                className="w-24 h-24 rounded-full border-4 border-gray-600"
                style={{ backgroundColor: winningColor?.value }}
              ></div>
              <p className="mt-2 font-bold text-gray-200">
                {winningColor?.name}
              </p>
            </>
          )}
        </div>

        {/* Responsive player layout */}
        {getPlayerLayout()}
      </div>

      {/* Results popup */}
      {showResults && (
        <div className="fixed inset-0 bg-transparent bg-opacity-80 flex justify-center items-center z-20 p-4">
          <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-6 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Game Results
            </h2>

            {winners.length > 0 ? (
              <div className="mb-4">
                <p className="font-bold text-xl text-green-500 mb-2">
                  {winners.length === 1 ? "Winner!" : "Winners!"}
                </p>
                <ul className="mb-4">
                  {winners.map((winner, index) => (
                    <li key={index} className="font-bold text-gray-200">
                      {winner.name}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-xl text-red-500 mb-4">No one wins!</p>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:space-x-4">
              <button
                onClick={handlePlayAgain}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105"
              >
                Play Again
              </button>
              <button
                onClick={handleExit}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105"
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
