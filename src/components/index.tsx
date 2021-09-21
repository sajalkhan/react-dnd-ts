import React, { useCallback, useState } from "react";

import { DndProvider } from "react-dnd";
import update from "immutability-helper";
import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "../utils/html5toTouch";
import DraggableGridItem from "../utils/draggableGridItem";
import Grid from "../utils/grid";

import Data from "./data";

const Home: React.FC = () => {
  const [cards, setCards] = useState(Data);

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = cards[dragIndex];
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [cards]
  );

  return (
    <DndProvider backend={MultiBackend as any} options={HTML5toTouch}>
      <Grid>
        {cards.map((card, indx) => (
          <DraggableGridItem
            key={card.id}
            index={indx}
            id={card.id}
            moveCard={moveCard}
            gridColumn={card.column === "1" ? "1 / -1" : "auto"}
          >
            <div>
              <p>{card.id}</p>
              {card.info.map((i, index) => (
                <p key={index}>
                  <b>{i.label}</b> : {i.value}
                </p>
              ))}
            </div>
          </DraggableGridItem>
        ))}
      </Grid>
    </DndProvider>
  );
};

export default Home;
