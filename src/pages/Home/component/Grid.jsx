import React, { useEffect } from "react";
import { useData } from "../../../context/dataContext";
import { Card } from "./Card";
export function Grid() {
  const { list, showGrid, setShowGrid } = useData();

  useEffect(() => {
    let timerId;
    if (showGrid.grid) {
      timerId = setTimeout(() => setShowGrid((prev) => ({ ...prev, card: false })), 5000);
    }
    return () => clearTimeout(timerId);
  }, []);

  return (
    <div className={`h-full max-h-4xl flex items-center ${showGrid.card && "pointer-events-none"}`}>
      <div className="grid gap-4 grid-cols-4">
        {list.map(({ id, path }) => (
          <Card key={id} id={id} path={path} />
        ))}
      </div>
    </div>
  );
}
