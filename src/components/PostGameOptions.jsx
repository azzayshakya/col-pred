import { create } from 'zustand';

const useGameStore = create((set) => ({
  players: [],
  selectedColors: [],
  winner: null,
  setPlayers: (players) => set({ players }),
  setSelectedColors: (colors) => set({ selectedColors: colors }),
  setWinner: (winner) => set({ winner }),
  resetGame: () => set({ players: [], selectedColors: [], winner: null })
}));

export default useGameStore;
