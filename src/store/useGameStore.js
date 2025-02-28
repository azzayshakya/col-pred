import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useGameStore = create(persist(
  (set) => ({
    // Game Flow
    currentStep: 1,
    
    // Game Data
    players: [],
    selectedColors: [],
    winner: null,
    
    // Actions
    setCurrentStep: (step) => set({ currentStep: step }),
    setPlayers: (players) => set({ players }),
    setSelectedColors: (colors) => set({ selectedColors: colors }),
    setWinner: (winner) => set({ winner }),
    resetGame: () => set({ 
      currentStep: 1, 
      players: [], 
      selectedColors: [], 
      winner: null 
    }),
  }),
  {
    name: "game-storage", // Name in localStorage
    partialize: (state) => ({
      currentStep: state.currentStep,
      players: state.players,
      selectedColors: state.selectedColors,
      winner: state.winner,
    })
  }
));

export default useGameStore;
