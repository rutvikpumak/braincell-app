import { createContext, useState, useContext, useEffect } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [showGrid, setShowGrid] = useState({
    grid: false,
    card: true,
  });
  const [list, setList] = useState([]);
  const [cardMatch, setCardMatch] = useState([]);
  const [visibleCard, setVisibleCard] = useState([]);

  useEffect(() => {
    fetch("assets/card-flip.json")
      .then((res) => res.json())
      .then((data) => {
        let listData = data["Card-Flip"];
        listData = listData[0].imageSet
          .concat(listData[0].imageSet.map((list) => ({ ...list, id: list.id + 1 })))
          .sort(() => {
            return 0.5 - Math.random();
          });
        setList(listData);
      });
  }, []);

  useEffect(() => {
    if (cardMatch.length === 2) {
      if (cardMatch[0].path !== cardMatch[1].path) {
        const filterList = visibleCard.filter(
          (list) => list !== cardMatch[0].id && list !== cardMatch[1].id
        );
        setVisibleCard(filterList);
      }
      setCardMatch([]);
    }
  }, [cardMatch]);

  return (
    <DataContext.Provider
      value={{
        showGrid,
        setShowGrid,
        list,
        setList,
        cardMatch,
        setCardMatch,
        visibleCard,
        setVisibleCard,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { useData, DataProvider };
