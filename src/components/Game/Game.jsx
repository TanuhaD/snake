import { useEffect, useState } from "react";
import PlayingField from "../PlayingField/PlayingField";
import css from "./Game.module.css";
import {
  DIRECTIONS,
  PLAYING_FIELD_HEIGHT,
  PLAYING_FIELD_WIDTH,
  SNAKE_START_POSITION,
} from "../../constants";
import Modal from "../Modal/Modal";

const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

const isInSnake = (snake, coords) => {
  return snake.some((section) => {
    return section.x === coords.x && section.y === coords.y;
  });
};
const getNewFoodCoords = (snake) => {
  let newCoords;
  do {
    newCoords = {
      x: randomNum(0, PLAYING_FIELD_WIDTH - 1),
      y: randomNum(0, PLAYING_FIELD_HEIGHT - 1),
    };
  } while (isInSnake(snake, newCoords));
  return newCoords;
};
const moveSnake = (
  prevSnake,
  foodCoords,
  setFoodCoords,
  direction,
  setIsGameOver
) => {
  const newSnake = [...prevSnake];
  const head = newSnake.at(-1);

  switch (direction) {
    case DIRECTIONS.left:
      if (head.x - 1 < 0 || isInSnake(newSnake, { x: head.x - 1, y: head.y })) {
        setIsGameOver(true);
        return prevSnake;
      }
      newSnake.push({ ...head, x: head.x - 1 });
      break;
    case DIRECTIONS.right:
      if (
        head.x + 1 >= PLAYING_FIELD_WIDTH ||
        isInSnake(newSnake, { x: head.x + 1, y: head.y })
      ) {
        setIsGameOver(true);
        return prevSnake;
      }
      newSnake.push({ ...head, x: head.x + 1 });
      break;
    case DIRECTIONS.up:
      if (head.y - 1 < 0 || isInSnake(newSnake, { y: head.y - 1, x: head.x })) {
        setIsGameOver(true);
        return prevSnake;
      }
      newSnake.push({ ...head, y: head.y - 1 });
      break;
    case DIRECTIONS.down:
      if (
        head.y + 1 >= PLAYING_FIELD_HEIGHT ||
        isInSnake(newSnake, { y: head.y + 1, x: head.x })
      ) {
        setIsGameOver(true);
        return prevSnake;
      }
      newSnake.push({ ...head, y: head.y + 1 });
      break;
  }
  const newHead = newSnake.at(-1);
  if (newHead.x === foodCoords.x && newHead.y === foodCoords.y) {
    const newFoodCoords = getNewFoodCoords(newSnake);
    setFoodCoords(newFoodCoords);
  } else {
    newSnake.shift();
  }
  return newSnake;
};
const Game = () => {
  const [snake, setSnake] = useState(SNAKE_START_POSITION);
  const [direction, setDirection] = useState(DIRECTIONS.right);
  const [isGameOver, setIsGameOver] = useState(false);
  const [restart, setRestart] = useState(false);
  const [maxScore, setMaxScore] = useState(() => {
    return +localStorage.getItem("maxScore");
  });
  const [foodCoords, setFoodCoords] = useState(() =>
    getNewFoodCoords(SNAKE_START_POSITION)
  );
  const [changeDirectionByKeyboard, setChangeDirectionByKeyboard] =
    useState(null);

  useEffect(() => {
    if (restart) {
      setSnake(SNAKE_START_POSITION);
      setDirection(DIRECTIONS.right);
      setFoodCoords(getNewFoodCoords(SNAKE_START_POSITION));
      setIsGameOver(false);
      setRestart(false);
    }
  }, [restart]);
  useEffect(() => {
    if (isGameOver) {
      if (maxScore === 0 || snake.length * 10 > maxScore) {
        localStorage.setItem("maxScore", snake.length * 10);
        setMaxScore(snake.length * 10);
      }
    }
    if (!isGameOver) {
      setSnake((prevSnake) => {
        return moveSnake(
          prevSnake,
          foodCoords,
          setFoodCoords,
          direction,
          setIsGameOver
        );
      });
    }
    let intervalId;
    if (!isGameOver) {
      intervalId = setInterval(() => {
        setSnake((prevSnake) => {
          return moveSnake(
            prevSnake,
            foodCoords,
            setFoodCoords,
            direction,
            setIsGameOver
          );
        });
      }, 500 - snake.length * 20);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [direction, isGameOver]);

  const hadleChangeDirectionSnake = (newDirection) => {
    if (
      (newDirection % 2 === 0 && direction % 2 === 0) ||
      (newDirection % 2 !== 0 && direction % 2 !== 0)
    ) {
      return;
    }
    setDirection(newDirection);
  };

  useEffect(() => {
    if (changeDirectionByKeyboard) {
      hadleChangeDirectionSnake(changeDirectionByKeyboard);
      setChangeDirectionByKeyboard(null);
    }
  }, [changeDirectionByKeyboard]);

  const handleKeyPress = (e) => {
    console.log(e.code);
    switch (e.code) {
      case "ArrowLeft":
        setChangeDirectionByKeyboard(DIRECTIONS.left);
        break;
      case "ArrowRight":
        setChangeDirectionByKeyboard(DIRECTIONS.right);
        break;
      case "ArrowUp":
        setChangeDirectionByKeyboard(DIRECTIONS.up);
        break;
      case "ArrowDown":
        setChangeDirectionByKeyboard(DIRECTIONS.down);
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className={css.container}>
      {isGameOver && <Modal setRestart={setRestart} />}
      <div className={css.box}>
        <div className={css.count}>{snake.length * 10}</div>
        <div>{maxScore}</div>
        <PlayingField
          snake={snake}
          isGameOver={isGameOver}
          setIsGameOver={setIsGameOver}
          foodCoords={foodCoords}
        />
      </div>
      <div className={css.wrapperBtn}>
        <button
          className={css.controlBtn}
          type="button"
          onClick={() => hadleChangeDirectionSnake(DIRECTIONS.left)}
        >
          left
        </button>
        <div className={css.boxBtn}>
          <button
            className={css.controlBtn}
            type="button"
            onClick={() => hadleChangeDirectionSnake(DIRECTIONS.up)}
          >
            up
          </button>
          <button
            className={css.controlBtn}
            type="button"
            onClick={() => hadleChangeDirectionSnake(DIRECTIONS.down)}
          >
            down
          </button>
        </div>

        <button
          className={css.controlBtn}
          type="button"
          onClick={() => hadleChangeDirectionSnake(DIRECTIONS.right)}
        >
          right
        </button>
      </div>
    </div>
  );
};

export default Game;
