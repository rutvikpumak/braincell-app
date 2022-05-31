import React, { useState, useEffect } from "react";
import { useData } from "../../context/dataContext";
import { Grid } from "./component/Grid";
import "./Home.css";
export function Home() {
  const [timer, setTimer] = useState(3);
  const [patternTimer, setPatternTimer] = useState(20);

  const { showGrid, setShowGrid, counter, list, score, currentList } = useData();

  //Timer countdown to remembering the card
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

  //Timer countdown for a single pattern
  useEffect(() => {
    let timerId;
    if (!showGrid.card) {
      if (patternTimer > 0) {
        timerId = setInterval(() => {
          setPatternTimer((prev) => prev - 1);
          if (patternTimer === 0) {
            clearInterval(timerId);
          }
        }, 1000);
      }
    }
    return () => clearInterval(timerId);
  }, [patternTimer, showGrid.card]);

  //Resetting timer for new pattern
  useEffect(() => {
    setTimer(3);
    setPatternTimer(20)
  }, [counter]);

  return (
    <div className="flex flex-col container">
      <nav className="flex justify-end gap-4 p-4">
        <p className="text-xl font-bold mr-4">Score: {score}</p>
        <p className="text-xl font-bold mr-4">Timer: {patternTimer}</p>
      </nav>
      {patternTimer === 0 && score !== (currentList.length / 2) * 10 ? (
        <div className="h-screen flex justify-center items-center flex-col gap-8">
          <h1 className="text-4xl font-bold text-center">
            Your Score : {`${score}/${(currentList.length / 2) * 10}`}
          </h1>
          <h1 className="text-6xl font-bold text-center">Oops , You couldn't make it</h1>
        </div>
      ) : (
        <main className="h-screen flex justify-center items-center flex-col">
          {counter !== 0 && counter === list.length ? (
            <h1 className="text-3xl font-bold">Brilliant , You have cleared all the pattern</h1>
          ) : (
            <>
              <h1 className="text-3xl mt-8 font-bold text-center">
                {showGrid.card ? "Remember the cards" : " Match the Patterns"}
              </h1>
              {showGrid.grid ? (
                <Grid />
              ) : (
                <h1 className=" flex justify-center items-center text-6xl font-bold text-center">
                  {timer}
                </h1>
              )}
            </>
          )}
        </main>
      )}
    </div>
  );
}
