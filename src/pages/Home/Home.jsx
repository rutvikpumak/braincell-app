import React, { useState, useEffect } from "react";
import { useData } from "../../context/dataContext";
import { Grid } from "./component/Grid";
import "./Home.css";
export function Home() {
  const [timer, setTimer] = useState(3);
  const { showGrid, setShowGrid } = useData();

  useEffect(() => {
    let timerId;
    if (timer > 0) {
      timerId = setInterval(() => {
        setTimer((prev) => prev - 1);
        if (timer === 1) {
          setShowGrid((prev) => ({ ...prev, grid: true }));
          clearInterval(timerId);
        }
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [timer]);

  return (
    <div className="container">
      <main className="h-screen flex justify-center items-center flex-col">
        <h1 className="text-3xl mt-16 font-bold text-center">
          {showGrid.card ? "Remember the cards" : " Match the Patterns"}
        </h1>
        {showGrid.grid ? (
          <Grid />
        ) : (
          <h1 className=" flex justify-center items-center text-6xl font-bold text-center">
            {timer}
          </h1>
        )}
      </main>
    </div>
  );
}
