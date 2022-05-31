import React, { useEffect, useState } from "react";
import { useData } from "../../../context/dataContext";

export function Card({ id, path }) {
  const {
    showGrid: { card },
    cardMatch,
    setCardMatch,
    visibleCard,
    setVisibleCard,
  } = useData();
  const [showCard, setShowCard] = useState(false);

  const cardClickHandler = () => {
    setShowCard(!showCard);
    setCardMatch((prev) => [...prev, { id, path }]);
    setVisibleCard((prev) => [...prev, id]);
  };

  useEffect(() => {
    if (cardMatch.length === 2 && showCard) {
      setTimeout(() => setShowCard(false), 2000);
    }
  }, [cardMatch]);

  const imgUrl =
    (visibleCard.includes(id) && path) || card
      ? path
      : showCard === false
      ? "https://www.mentalup.co/samples/img/game-v2/game24/close-stone.png"
      : path;

  return (
    <div className="cursor-pointer h-32 w-32 rounded-md   bg-white flex justify-center items-center border-double border-4 border-slate-500">
      <img
        className="object-contain h-28 w-28 object-center"
        src={imgUrl}
        onClick={() => cardClickHandler()}
      />
    </div>
  );
}
