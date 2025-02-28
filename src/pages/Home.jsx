// Improved Home.js
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

const Home = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  // Animated color bubbles background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Create bubbles
    const bubbles = [];
    const colors = [
      "#FF4136", // Red
      "#0074D9", // Blue
      "#2ECC40", // Green
      "#FFDC00", // Yellow
      "#B10DC9", // Purple
      "#FF851B", // Orange
      "#F012BE", // Pink
      "#001f3f", // Navy
      "#01FF70", // Lime
      "#7FDBFF", // Aqua
    ];

    for (let i = 0; i < 50; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 30 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#1a202c");
      gradient.addColorStop(1, "#2d3748");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw bubbles
      bubbles.forEach((bubble) => {
        // Move bubble
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;

        // Bounce off walls
        if (
          bubble.x < bubble.radius ||
          bubble.x > canvas.width - bubble.radius
        ) {
          bubble.vx *= -1;
        }
        if (
          bubble.y < bubble.radius ||
          bubble.y > canvas.height - bubble.radius
        ) {
          bubble.vy *= -1;
        }

        // Draw bubble
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color + "40"; // Add transparency
        ctx.fill();
      });

      animationFrameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const startGame = () => {
    navigate("/step1");
  };

  return (
    <div className="relative min-h-screen pt-16">
      <Navbar />
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      <div className="relative z-10 min-h-[calc(100vh-64px)] flex flex-col justify-center items-center p-4">
        <div className="max-w-2xl w-full text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-4 text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Color Quest
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 mb-8">
            The ultimate color prediction game of chance and strategy!
          </p>
        </div>

        <div className="w-full max-w-md bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className="grid grid-cols-5 gap-2">
                {["#FF4136", "#0074D9", "#2ECC40", "#FFDC00", "#B10DC9"].map(
                  (color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full border-2 border-white transform hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    ></div>
                  )
                )}
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-center text-white">
              Ready to test your luck?
            </h2>

            <div className="space-y-4 mb-6 text-gray-300">
              <p>🎮 Play with up to 4 players</p>
              <p>🎨 Predict the winning colors</p>
              <p>⏱️ Beat the 10-second timer</p>
              <p>🏆 Compete with friends and family</p>
            </div>

            <button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-4 rounded-lg transition transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
            >
              <span className="mr-2">START GAME</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
