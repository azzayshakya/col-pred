import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';

const About = () => {
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <Navbar/>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          About ColorPredict
        </h1>
        
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">How to Play</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">1</div>
              <p>Select the number of players (1-4) who will be participating in the game.</p>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">2</div>
              <p>Enter a name for each player so we can track who's who during the game.</p>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">3</div>
              <p>Choose between 5-10 colors that will be used in the game. These will be the options players can pick from.</p>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">4</div>
              <p>During the game, each player must select a color and lock it in before the 10-second timer runs out.</p>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">5</div>
              <p>After the timer ends, a winning color is randomly selected. Any player who picked that color wins!</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">Game Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-blue-300">Multi-player Support</h3>
              <p>Play with up to 4 friends on the same device!</p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-blue-300">Customizable Colors</h3>
              <p>Choose from 10 vibrant colors to include in your game.</p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-blue-300">Quick Rounds</h3>
              <p>Fast-paced 10-second rounds keep the excitement high!</p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-blue-300">No Account Needed</h3>
              <p>Jump right into the fun - no login or signup required.</p>
            </div>
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
    </div>
  );
};

export default About;
