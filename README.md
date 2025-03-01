# 🎨 Color Quest

Welcome to the **Color Quest**! A fun, interactive, and responsive web app built using React. Test your luck and prediction skills in this vibrant color selection game. 

---

## 🚀 Live Demo

Check out the live version here: [Color Prediction Game](https://color-quest-az.vercel.app/)

---

## 🎯 Features

- **Multi-Step Game Flow:** 
  - Step 1: Select Number of Players
  - Step 2: Enter Player Names
  - Step 3: Choose Total Number of Colors
  - Step 4: Play the Game with a Timer and Color Locking
  - Step 5: Post-Game Options (Play Again or Exit)

- **Dynamic Player Boxes:** Layout changes dynamically based on the number of players.

- **Responsive Design:** Mobile-first approach, adaptable to all screen sizes.

- **Smooth Animations:** Seamless transitions and engaging UI.

- **Error Handling:** Robust validation and error popups using Toastify.

---

## 🛠️ Tech Stack

- **React**: Frontend framework
- **React Router DOM**: For navigation and step-wise flow
- **Zustand**: State management across all steps
- **ShadCN**: Modern UI components
- **Tailwind CSS**: Styling and responsive design
- **React Toastify**: Alerts and notifications
- **Vite**: Fast and modern development environment

---

## 🎮 Game Flow & Functionality

### Step 1: Select Number of Players
- Choose between 1 to 4 players.
- Validates the selection, showing a popup if none are selected.
- Proceeds to the next step upon successful validation.

### Step 2: Enter Player Names
- Displays input boxes dynamically based on the number of players.
- Ensures all names are filled before moving to the next step.

### Step 3: Select Total Number of Colors
- Show 10 color options.
- Minimum 5 colors required (5 pre-selected by default).
- Saves selection in Zustand.

### Step 4: Main Game Screen
- Dynamic layout:
  - 1 Player: Box at the bottom
  - 2 Players: Boxes at the top and bottom
  - 3 or 4 Players: Arranged accordingly
- Central box with a 10-second timer.
- Players lock their color before the timer ends, or they automatically lose.
- Reveals the result and declares the winner.

### Step 5: Post-Game Options
- **Play Again:** Same players and settings, state preserved in Zustand.
- **Exit:** Clears Zustand data and returns to Step 1.

---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/color-prediction-game.git

# Navigate to the project directory
cd color-prediction-game

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## 📁 Project Structure

```
src/
│
├── components/       # Reusable UI components
├── features/         # Game steps and logic
├── hooks/            # Custom hooks for Zustand state management
├── pages/            # Pages for React Router DOM
└── App.jsx           # Main App component
└── main.jsx          # ReactDOM entry point
```

---

## ⚙️ Usage

- **Step Navigation**: Handled using React Router DOM.
- **State Management**: Using Zustand for consistent data flow across steps.
- **Notifications**: Alerts and validation popups with React Toastify.
- **Animations**: Smooth transitions for a dynamic user experience.

---

## 🖼️ UI & Design

- **ShadCN Components**: For a modern and clean UI.
- **Tailwind CSS**: Ensures responsive and adaptive layouts.
- **Animations**: Smooth transitions between steps.

---

## 🛑 Error Handling

- Validations at every step with descriptive popup alerts.
- Ensures no step is skipped, maintaining game flow integrity.

---

## 💡 Future Enhancements

- Add more color prediction modes.
- Implement a scoreboard to track player performance.
- Enhance animations for a more engaging user experience.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the project
2. Create a new branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request
6. 
---

## 🌐 Connect with Me

- Twitter: [@azzayshakya](https://twitter.com/azzayshakya)
- LinkedIn: [Ajay Shakya](https://www.linkedin.com/in/azzayshakya)
- GitHub: [azzayshakya](https://github.com/azzayshakya)

---

## 🎉 Acknowledgements

- Special thanks to the creators of **React**, **Zustand**, **ShadCN**, and **Tailwind CSS** for their amazing tools and libraries.
- Inspired by the love for interactive web games and vibrant color designs.

---

## 🔥 Let's Predict Some Colors!

Give the **Color Prediction Game** a try and see how sharp your color instincts are. Enjoy the dynamic gameplay, and may the odds be in your favor! 🎨🏆
