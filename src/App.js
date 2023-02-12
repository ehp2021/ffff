import React, { useState, useEffect } from "react";

const maxObstacleX = window.innerWidth - 75;
const maxObstacleY = 200-50;

const App = () => {
  const [humanX, setHumanX] = useState(50);
  const [humanY, setHumanY] = useState(150);
  const [pastaX, setPastaX] = useState(
    Math.random() * maxObstacleX
  );
  const [pastaY, setPastaY] = useState(
    Math.random() * maxObstacleY + 100
  );
  const [score, setScore] = useState(0);
  const [humanSize, setHumanSize] = useState(1);
  const [alertStyle, setAlertStyle] = useState({
    backgroundColor: "#F0F0F0",
    borderRadius: "5px",
    border: "solid 1px black",
    width: "300px",
    position: "absolute",
    left: "-150px",
    padding: "10px",
    paddingBottom: "50px",
    textAlign: "left",
  });
  
  const showAlert = (message) => {
    alert(
      <div style={alertStyle}>
        {message}
      </div>
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        setHumanX(humanX + 50);
      } else if (e.key === "ArrowLeft") {
        setHumanX(humanX - 50);
      } else if (e.key === "ArrowUp") {
        setHumanY(humanY - 50);
      } else if (e.key === "ArrowDown") {
        setHumanY(humanY + 50);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [humanX, humanY]);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPastaX(pastaX - 5);
      if (pastaX < 0) {
        setPastaX(400);
        setPastaY(Math.random() * 200)
        console.log(Math.random() * 300, "Y, line 42")
          // window.innerHeight);
      }
      if (
        humanX < pastaX + 50 &&
        humanX + 50 > pastaX &&
        humanY < pastaY + 50 &&
        humanY + 50 > pastaY
      ) {
        setHumanSize(humanSize + 0.5);
        setPastaX(500);
        setPastaY(Math.random() * 400);
        console.log(Math.random() * 350, "Y line 54")
        setScore(score + 1);
      }
      if (humanSize >= 5) {
        alert("You Win! Your head grew 5x from eating " + score + " bowls of pasta and you did it in " + (20-time) + " seconds!");
        window.location.reload();
      }
    }, 50);
    return () => {
      clearInterval(intervalId);
    };
  }, [pastaX, pastaY, humanX, humanY, score, humanSize]);
  
  //timer
  const [time, setTime] = useState(20); // Initial time limit of 60 seconds
  const [gameOver, setGameOver] = useState(false); // State to keep track of game over condition

  useEffect(() => {
    if (!gameOver) {
      const intervalId = setInterval(() => {
        setTime(time - 1); // decrement the time by 1 second
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [time, gameOver]);


  useEffect(() => {
    if (time === 0) {
      setGameOver(true);
      alert("Time's up! Your final score is: " + score);
      window.location.reload();
    }
  }, [time]);

  return (
    <div style={{
        backgroundImage: "url(pastapattern.jpeg)",
        backgroundSize: "400px 200px",
        }}>
      <h1 style={{ textAlign: "center", 
        color: "#9D00FF",
        fontFamily: "Arial",
        padding: '5px',
        // borderRadius: "2px",
        textShadow: "rebeccapurple 0 0 10px"
      }}>
          PASTA EATER</h1>
      <h3 style={{ textAlign: "center" }}>You have 20 seconds to eat!!</h3>
      <h2 style={{ textAlign: "center" }}>Score: {score}</h2>
      <h2 style={{ textAlign: "center" }}>Time: {time} seconds</h2>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "200px",
          background: "#fff",
          
        }}
      >
        <img 
          src={require("./man.png")} 
          alt="Human Face" 
          style={{
            position: "absolute",
            left: humanX,
            top: humanY,
            width: 50 * humanSize,
            height: 50 * humanSize,
          }}
        />
        <div
          style={{
            position: "relative",
            left: pastaX,
            top: pastaY,
            width: 90,
            height: 90,
            backgroundImage: "url(pasta.png)",
            backgroundSize: "cover",
          }}
        />
      </div>
    </div>
  )
}

export default App;