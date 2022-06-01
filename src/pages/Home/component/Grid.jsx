import React, { useEffect } from "react";
import { useData } from "../../../context/dataContext";
import { Card } from "./Card";
export function Grid() {
  const { showGrid, setShowGrid, currentList, counter } = useData();

  //timer of 10 sec to have quick glance on all card
  useEffect(() => {
    let timerId;
    if (showGrid.grid) {
      timerId = setTimeout(() => setShowGrid((prev) => ({ ...prev, card: false })), 10000);
    }
    return () => clearTimeout(timerId);
  }, [counter]);

  return (
    <div className={`h-full max-h-4xl flex items-center ${showGrid.card && "pointer-events-none"}`}>
      <div className="grid gap-4 grid-cols-4 md:grid-cols-3 ">
        {currentList?.map(({ id, path }) => (
          <Card key={id} id={id} path={path} />
        ))}
      </div>
    </div>
  );
}
