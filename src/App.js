import React, { useState, useEffect } from 'react';

/**
 * Liquid Glass Tic Tac Toe
 * A highly polished, iOS-glassmorphism inspired game.
 */

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winningLine, setWinningLine] = useState(null);
  const [gameStatus, setGameStatus] = useState('playing'); // playing, won, draw

  // Check for winner
  useEffect(() => {
    const checkWinner = () => {
      const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
        [0, 4, 8], [2, 4, 6]             // diagonals
      ];

      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          setWinningLine(lines[i]);
          setGameStatus('won');
          return;
        }
      }

      if (!board.includes(null)) {
        setGameStatus('draw');
      }
    };

    if (gameStatus === 'playing') {
      checkWinner();
    }
  }, [board, gameStatus]);

  const handleClick = (index) => {
    if (board[index] || gameStatus !== 'playing') return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinningLine(null);
    setGameStatus('playing');
  };

  // SVGs for Marks
  const XIcon = ({ animate }) => (
    <svg viewBox="0 0 100 100" className={`w-12 h-12 sm:w-16 sm:h-16 drop-shadow-lg ${animate ? 'animate-draw' : ''}`}>
      <defs>
        <linearGradient id="gradX" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" /> 
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <filter id="glowX" x="-20%" y="-20%" width="140%" height="140%">
           <feGaussianBlur stdDeviation="4" result="blur" />
           <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <path 
        d="M 25 25 L 75 75 M 75 25 L 25 75" 
        fill="none" 
        stroke="url(#gradX)" 
        strokeWidth="10" 
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glowX)"
        className="mark-path"
      />
    </svg>
  );

  const OIcon = ({ animate }) => (
    <svg viewBox="0 0 100 100" className={`w-12 h-12 sm:w-16 sm:h-16 drop-shadow-lg ${animate ? 'animate-draw' : ''}`}>
      <defs>
        <linearGradient id="gradO" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#db2777" />
        </linearGradient>
        <filter id="glowO" x="-20%" y="-20%" width="140%" height="140%">
           <feGaussianBlur stdDeviation="4" result="blur" />
           <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <circle 
        cx="50" 
        cy="50" 
        r="30" 
        fill="none" 
        stroke="url(#gradO)" 
        strokeWidth="10" 
        strokeLinecap="round"
        filter="url(#glowO)"
        className="mark-path-circle"
      />
    </svg>
  );

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center font-sans bg-gray-900 text-white selection:bg-blue-500/30">
      
      {/* --- Dynamic Fluid Background --- */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
         {/* Using CSS keyframes defined below for smooth movement */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600 rounded-full mix-blend-multiply filter blur-[80px] animate-blob" />
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-600 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] bg-pink-600 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-4000" />
      </div>

      {/* --- Main Glass Container --- */}
      <div className="relative z-10 p-8 sm:p-12 rounded-[3rem] shadow-2xl glass-panel w-full max-w-md mx-4 flex flex-col items-center gap-8 border border-white/20">
        
        {/* Header */}
        <div className="flex flex-col items-center space-y-2 w-full">
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60 drop-shadow-sm">
            Tic Tac Toe
          </h1>
          
          <div className="flex items-center gap-3 px-4 py-2 rounded-full glass-pill text-sm font-medium tracking-wide text-white/90 shadow-inner">
            {gameStatus === 'playing' ? (
              <>
                <span className={isXNext ? 'opacity-100 font-bold text-blue-300' : 'opacity-50'}>Player X</span>
                <span className="text-white/20">|</span>
                <span className={!isXNext ? 'opacity-100 font-bold text-pink-300' : 'opacity-50'}>Player O</span>
              </>
            ) : gameStatus === 'won' ? (
              <span className="bg-gradient-to-r from-blue-300 to-pink-300 bg-clip-text text-transparent font-bold animate-pulse">
                {isXNext ? 'Player O' : 'Player X'} Wins!
              </span>
            ) : (
              <span className="text-white/80">It's a Draw!</span>
            )}
          </div>
        </div>

        {/* Game Grid */}
        <div className="relative">
          <div className="grid grid-cols-3 gap-3 p-3 rounded-[2rem] glass-inset shadow-inner">
            {board.map((cell, index) => {
              const isWinningCell = winningLine?.includes(index);
              return (
                <button
                  key={index}
                  onClick={() => handleClick(index)}
                  disabled={!!cell || gameStatus !== 'playing'}
                  className={`
                    relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center 
                    transition-all duration-500 ease-out
                    ${!cell && gameStatus === 'playing' ? 'hover:bg-white/10 active:scale-95 cursor-pointer' : 'cursor-default'}
                    ${cell ? 'bg-white/5 shadow-sm' : 'bg-transparent'}
                    ${isWinningCell ? 'winning-cell' : ''}
                  `}
                >
                  {/* Inner bevel for depth */}
                  <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none" />
                  
                  {/* Mark */}
                  {cell === 'X' && <XIcon animate={true} />}
                  {cell === 'O' && <OIcon animate={true} />}
                </button>
              );
            })}
          </div>

          {/* Victory Line Overlay (Visual flourish if desired, but CSS highlight on cells is cleaner for liquid theme) */}
        </div>

        {/* Controls */}
        <button
          onClick={resetGame}
          className="group relative px-8 py-3 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-full" />
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10 font-medium text-white tracking-wider text-sm uppercase">
            {gameStatus === 'playing' ? 'Restart Game' : 'Play Again'}
          </span>
        </button>

      </div>

      {/* --- Footer / Attribution --- */}
      <div className="absolute bottom-6 text-white/30 text-xs font-light tracking-widest uppercase">
        Liquid Glass UI
      </div>

      <style>{`
        /* Glassmorphism Utilities */
        .glass-panel {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(25px) saturate(180%);
          -webkit-backdrop-filter: blur(25px) saturate(180%);
          box-shadow: 
            0 8px 32px 0 rgba(0, 0, 0, 0.3),
            inset 0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        .glass-pill {
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }

        .glass-inset {
          background: rgba(0, 0, 0, 0.2);
          box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
        }

        /* SVG Animations */
        .mark-path {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: draw-stroke 0.6s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }

        .mark-path-circle {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: draw-stroke-circle 0.7s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }

        @keyframes draw-stroke {
          to { stroke-dashoffset: 0; }
        }
        @keyframes draw-stroke-circle {
          to { stroke-dashoffset: 0; }
        }

        /* Winning Animation */
        .winning-cell {
          background: rgba(255, 255, 255, 0.15) !important;
          box-shadow: 
            0 0 20px rgba(255, 255, 255, 0.2),
            inset 0 0 10px rgba(255, 255, 255, 0.1);
          animation: pulse-win 2s infinite;
        }

        @keyframes pulse-win {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        /* Background Blob Animations */
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {np
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default App;