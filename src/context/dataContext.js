import { createContext, useState, useContext, useEffect } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [showGrid, setShowGrid] = useState({
    grid: false,
    card: true,
  });
  const [list, setList] = useState([]);
  const [counter, setCounter] = useState(0);
  const [score, setScore] = useState(0);
  const [currentList, setCurrentList] = useState([]);
  const [cardMatch, setCardMatch] = useState([]);
  const [visibleCard, setVisibleCard] = useState([]);

  //UseEffect to fetch data from JSON file and set it to local state
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
        setList(data["Card-Flip"]);
      });
  }, []);

  //UseEffect to set current list i.e Object/pattern
  useEffect(() => {
    setCurrentList(
      list[counter]?.imageSet
        .concat(list[counter].imageSet.map((list) => ({ ...list, id: list.id + 1 })))
        .sort(() => {
          return 0.5 - Math.random();
        })
    );
  }, [list, counter]);

  //UseEffect to check if 2 cards are equal and set id's of cards which patterns matches
  useEffect(() => {
    if (cardMatch.length === 2) {
      if (cardMatch[0].path !== cardMatch[1].path) {
        const filterList = visibleCard.filter(
          (list) => list !== cardMatch[0].id && list !== cardMatch[1].id
        );
        setVisibleCard(filterList);
      } else {
        setScore((prev) => prev + 10);
      }
      if (visibleCard.length === currentList.length) {
        //moving to the next pattern only and only if previous solved completely
        setCounter((prev) => prev + 1);
        //Resetting previous values
        setShowGrid({
          grid: false,
          card: true,
        });
        setVisibleCard([]);
        setScore(0);
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
        currentList,
        setVisibleCard,
        counter,
        score,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { useData, DataProvider };
