import { create } from 'zustand';

const useGameStore = create((set) => ({
  players: [],
  selectedColors: [],
  availableColors: [
    { name: 'Red', value: '#FF0000' },
    { name: 'Blue', value: '#0000FF' },
    { name: 'Green', value: '#00FF00' },
    { name: 'Yellow', value: '#FFFF00' },
    { name: 'Purple', value: '#800080' },
    { name: 'Orange', value: '#FFA500' },
    { name: 'Pink', value: '#FFC0CB' },
    { name: 'Brown', value: '#A52A2A' },
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' }
  ],
  winningColor: null,
  
  // Methods to update state
  setPlayers: (players) => set({ players }),
  updatePlayerName: (index, name) => set((state) => {
    const updatedPlayers = [...state.players];
    updatedPlayers[index].name = name;
    return { players: updatedPlayers };
  }),
  setSelectedColors: (colors) => set({ selectedColors: colors }),
  updatePlayerColor: (index, color) => set((state) => {
    const updatedPlayers = [...state.players];
    updatedPlayers[index].color = color;
    return { players: updatedPlayers };
  }),
  setWinningColor: (color) => set({ winningColor: color }),
  resetGame: () => set((state) => ({
    winningColor: null,
    players: state.players.map(player => ({ ...player, color: '' }))
  })),
  clearAll: () => set({
    players: [],
    selectedColors: [],
    winningColor: null
  })
}));

export default useGameStore;