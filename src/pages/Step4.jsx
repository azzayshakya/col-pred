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

  useEffect(() => {
    if (!players || players.length === 0) {
      navigate("/step1");
      return;
    }
    if (!selectedColors || selectedColors.length < 5) {
      navigate("/step3");
    }
  }, [players, selectedColors, navigate]);

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
  };

  const endGame = () => {
    setGameEnded(true);
    const randomIndex = Math.floor(Math.random() * selectedColors.length);
    const winningColorValue = selectedColors[randomIndex];
    setWinningColor(winningColorValue);

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

  const winners = showResults
    ? players.filter(
        (player, index) =>
          lockedPlayers.includes(index) && player.color === winningColor.value
      )
    : [];

  const getPlayerLayout = () => {
    return (
      <div className="absolute inset-0">
        {players.map((player, index) => {
          const position = getDesktopPosition(index, players.length);
          return (
            <div key={index} className={`absolute ${position}`}>
              {renderPlayerBox(player, index)}
            </div>
          );
        })}
      </div>
    );
  };

  const getDesktopPosition = (index, totalPlayers) => {
    switch (totalPlayers) {
      case 1:
        return "bottom-4 left-1/2 transform -translate-x-1/2 ";
      case 2:
        return index === 0
          ? "top-25 left-0 md:left-10" // Player 1: Left alignment
          : "top-25 right-0 md:right-10"; // Player 2: Right alignment
      case 3:
        if (index === 0) return "top-25 left-0 md:left-1/4";
        if (index === 1) return "top-25 right-0 md:right-1/4";
        return "bottom-4 left-1/2 transform -translate-x-1/2";
      case 4:
        if (index === 0) return "top-25 left-0 md:left-10";
        if (index === 1) return "top-25 right-0 md:right-10";
        if (index === 2) return "bottom-10 left-0 md:left-10";
        return "bottom-10 right-0 md:right-10";
      default:
        return "";
    }
  };

  const renderPlayerBox = (player, index) => (
    <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-4 w-40 md:w-48 text-center transition-all">
      <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        {player.name}
      </h3>
      <select
        value={player.color}
        onChange={(e) => updatePlayerColor(index, e.target.value)}
        disabled={lockedPlayers.includes(index) || gameEnded}
        className="w-full p-2 border rounded mb-2 bg-gray-700 text-white border-gray-600"
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
            : "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
        }`}
      >
        {lockedPlayers.includes(index) ? "Locked" : "Lock Color"}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen pt-16 relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex justify-center items-center overflow-hidden">
      <Navbar />
      <div className="w-full relative flex flex-col items-center ">
        <div className="z-10 bg-gray-800  rounded-xl shadow-xl border border-gray-700 p-4 md:p-6 w-64 h-64 flex flex-col justify-center items-center mb-4 md:mb-0">
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
                className="w-24 h-24 rounded-full"
                style={{ backgroundColor: winningColor?.value }}
              ></div>
            </>
          )}
        </div>
      </div>
      <div className="">{getPlayerLayout()}</div>

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
