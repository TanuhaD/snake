import { useEffect, useState } from "react";
import PlayingField from "../PlayingField/PlayingField";
import css from "./Game.module.css";
import { DIRECTIONS, SNAKE_START_POSITION } from "../../constants";
import Modal from "../Modal/Modal";
import {
  getDirection,
  getNewFoodCoords,
  getScore,
  hadleChangeDirectionSnake,
  moveSnake,
} from "../../utils/utils";
import Controls from "../Controls/Controls";

const Game = () => {
  const [snake, setSnake] = useState(SNAKE_START_POSITION);
  const [direction, setDirection] = useState(DIRECTIONS.right);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [maxScore, setMaxScore] = useState(
    () => +localStorage.getItem("maxScore")
  );
  const [foodCoords, setFoodCoords] = useState(() =>
    getNewFoodCoords(SNAKE_START_POSITION)
  );

  const restartGame = () => {
    setSnake(SNAKE_START_POSITION);
    setDirection(DIRECTIONS.right);
    setFoodCoords(getNewFoodCoords(SNAKE_START_POSITION));
    setIsGameOver(false);
  };

  useEffect(() => {
    if (isGameOver) {
      if (maxScore === 0 || getScore(snake.length) > maxScore) {
        localStorage.setItem("maxScore", getScore(snake.length));
        setMaxScore(getScore(snake.length));
      }
    }
    if (!isGameOver && !isPaused) {
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
    if (!isGameOver && !isPaused) {
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
  }, [direction, isGameOver, isPaused]);

  const handleKeyPress = (e) => {
    console.log(e.code);
    if (e.code === "Escape") {
      setIsPaused((prevState) => {
        return !prevState;
      });
    }
    const newDirection = getDirection(e.code);
    if (newDirection) {
      hadleChangeDirectionSnake({ newDirection, setDirection });
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className={css.container}>
      {isGameOver && <Modal restartGame={restartGame} />}
      <div className={css.box}>
        <div className={css.count}>{getScore(snake.length)}</div>
        <div>{maxScore}</div>
        <PlayingField
          snake={snake}
          isGameOver={isGameOver}
          setIsGameOver={setIsGameOver}
          foodCoords={foodCoords}
        />
      </div>
      <Controls setDirection={setDirection} />
    </div>
  );
};

export default Game;
