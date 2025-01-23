// src/components/Game.jsx
import React, { useState, useEffect, useRef } from 'react';

const Game = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [dinoY, setDinoY] = useState(0);
  const [obstacleX, setObstacleX] = useState(500);
  const [score, setScore] = useState(0);
  const gameRef = useRef(null);
  const dinoRef = useRef(null);
  const obstacleRef = useRef(null);
  const gravity = 0.5;
  const jumpHeight = -10;
  const groundLevel = 100; // Adjust as needed
  const obstacleSpeed = 5;

  useEffect(() => {
    let animationFrameId;

    const gameLoop = () => {
      if (isRunning) {
        setDinoY((prevY) => Math.min(groundLevel, prevY + gravity));

        setObstacleX((prevX) => {
          const newX = prevX - obstacleSpeed;
          if (newX < -20) { // Off-screen
            setScore(prevScore => prevScore + 1);
            return 500; // Reset position
          }
          return newX;
        });

        // Collision detection (basic AABB)
        if (obstacleRef.current && dinoRef.current) {
          const dinoRect = dinoRef.current.getBoundingClientRect();
          const obstacleRect = obstacleRef.current.getBoundingClientRect();

          if (dinoRect.right > obstacleRect.left &&
              dinoRect.left < obstacleRect.right &&
              dinoRect.bottom > obstacleRect.top) {
            setIsRunning(false);
            alert(`Game Over! Score: ${score}`);
            setScore(0);
            setDinoY(0);
            setObstacleX(500);
          }
        }
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    if (isRunning) {
      animationFrameId = requestAnimationFrame(gameLoop);
    } else {
        cancelAnimationFrame(animationFrameId)
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isRunning, dinoY, obstacleX, score]);

  const handleJump = () => {
    if (dinoY === groundLevel && isRunning) { // Only jump if on the ground
      setDinoY(prevY => prevY + jumpHeight);
    }
  };

  return (
    <div ref={gameRef} className="h-screen w-screen bg-sky-200 relative overflow-hidden" tabIndex={0} onKeyDown={(e) => {if (e.key === ' ' || e.key === 'ArrowUp') handleJump();}} >
      <div className="absolute bottom-20 left-20" >Score : {score}</div>
      <div
        ref={dinoRef}
        className="absolute bottom-20 left-20 w-16 h-16 bg-red-500 rounded-full"
        style={{ bottom: groundLevel - dinoY }}
      />
      <div
        ref={obstacleRef}
        className="absolute bottom-20 w-8 h-8 bg-green-500"
        style={{ left: obstacleX }}
      />
      {!isRunning && <button className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-md p-4 text-white' onClick={() => setIsRunning(true)}>Start</button>}
    </div>
  );
};

export default Game;