import { useEffect, useState } from "react";
import PlayingField from "../PlayingField/PlayingField";
import css from "./Game.module.css";
import { DIRECTIONONS, SNAKE_START_POSITION } from "../../constants";
const Game = () => {
  const [snake, setSnake] = useState(SNAKE_START_POSITION);
  const [direction, setDirection] = useState(DIRECTIONONS.right);
  const [isGameOver, setIsGameOver] = useState(false);
  const [deletedElem, setDeletedElem] = useState(null);
  useEffect(() => {
    let intervalId;
    if (!isGameOver) {
      intervalId = setInterval(() => {
        setSnake((prevSnake) => {
          const newSnake = [...prevSnake];
          setDeletedElem(newSnake.shift());
          const head = newSnake.at(-1);
          switch (direction) {
            case DIRECTIONONS.left:
              newSnake.push({ ...head, x: head.x - 1 });
              break;
            case DIRECTIONONS.right:
              newSnake.push({ ...head, x: head.x + 1 });
              break;
            case DIRECTIONONS.up:
              newSnake.push({ ...head, y: head.y - 1 });
              break;
            case DIRECTIONONS.down:
              newSnake.push({ ...head, y: head.y + 1 });
              break;
          }
          return newSnake;
        });
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [direction, isGameOver]);

  const hadleChangeDerectionSnake = (newDirection) => {
    if (
      (newDirection % 2 === 0 && direction % 2 === 0) ||
      (newDirection % 2 !== 0 && direction % 2 !== 0)
    ) {
      return;
    }
    setDirection(newDirection);
  };

  return (
    <div className={css.container}>
      <PlayingField
        snake={snake}
        isGameOver={isGameOver}
        setIsGameOver={setIsGameOver}
        deletedElem={deletedElem}
      />
      <button
        type="button"
        onClick={() => hadleChangeDerectionSnake(DIRECTIONONS.left)}
      >
        left
      </button>
      <button
        type="button"
        onClick={() => hadleChangeDerectionSnake(DIRECTIONONS.up)}
      >
        up
      </button>
      <button
        type="button"
        onClick={() => hadleChangeDerectionSnake(DIRECTIONONS.down)}
      >
        down
      </button>
      <button
        type="button"
        onClick={() => hadleChangeDerectionSnake(DIRECTIONONS.right)}
      >
        right
      </button>
    </div>
  );
};

export default Game;
