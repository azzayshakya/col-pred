import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

const About = () => {
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          About Color Quest
        </h1>

        <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">
            What is Color Quest?
          </h2>
          <p>
            Color Quest is a fun and engaging color prediction game designed to
            bring excitement and friendly competition. Players compete to
            predict the winning color, adding an element of surprise and
            anticipation to each round.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">
            Game Purpose
          </h2>
          <p>
            The purpose of Color Quest is to provide a light-hearted and
            entertaining experience for players of all ages. It’s perfect for
            gatherings with friends and family, adding fun moments of guessing
            and cheering. The game encourages social interaction and friendly
            rivalry, all while keeping the atmosphere fun and playful.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">How to Play</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                1
              </div>
              <p>
                Select the number of players (1-4) who will be participating in
                the game.
              </p>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                2
              </div>
              <p>
                Enter a name for each player to keep track of everyone during
                the game.
              </p>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                3
              </div>
              <p>Choose between 5-10 colors that will be used in the game.</p>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                4
              </div>
              <p>
                Each player selects a color before the 10-second timer runs out.
              </p>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                5
              </div>
              <p>
                A winning color is randomly selected. Players who chose the
                winning color are declared the winners!
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">
            Disclaimer
          </h2>
          <p>
            Color Quest is designed purely for entertainment purposes. It is not
            associated with gambling, betting, or financial gain. The game aims
            to provide a fun and casual experience for friends and family to
            enjoy together.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-green-400">
            Credits & About Me
          </h2>

          <p className="mt-4">
            Color Quest is crafted with passion by a{" "}
            <span className="font-bold">Software Developer from India</span>. It
            reflects creativity and love for fun games. Enjoy playing Color
            Quest!
          </p>
        </div>

        <div className="text-center">
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-full hover:from-blue-600 hover:to-purple-700 transition transform hover:scale-105"
          >
            Ready to Play?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
