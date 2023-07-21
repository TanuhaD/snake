import {
  DIRECTIONS,
  PLAYING_FIELD_HEIGHT,
  PLAYING_FIELD_WIDTH,
  SNAKE_START_POSITION,
} from "../constants";

export const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

export const isInSnake = (snake, coords) => {
  return snake.some((section) => {
    return section.x === coords.x && section.y === coords.y;
  });
};
export const getNewFoodCoords = (snake) => {
  let newCoords;
  do {
    newCoords = {
      x: randomNum(0, PLAYING_FIELD_WIDTH - 1),
      y: randomNum(0, PLAYING_FIELD_HEIGHT - 1),
    };
  } while (isInSnake(snake, newCoords));
  return newCoords;
};
export const moveSnake = (
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
  console.log("newHead", newHead);
  console.log("foodCoords", foodCoords);
  if (newHead.x === foodCoords.x && newHead.y === foodCoords.y) {
    console.log("eat food");
    const newFoodCoords = getNewFoodCoords(newSnake);
    console.log(newFoodCoords);
    setFoodCoords(newFoodCoords);
  } else {
    newSnake.shift();
  }
  return newSnake;
};

export const getDirection = (keyCode) => {
  switch (keyCode) {
    case "ArrowLeft":
      return DIRECTIONS.left;
    case "ArrowRight":
      return DIRECTIONS.right;
    case "ArrowUp":
      return DIRECTIONS.up;
    case "ArrowDown":
      return DIRECTIONS.down;
  }
  return null;
};
export const hadleChangeDirectionSnake = ({ newDirection, setDirection }) => {
  setDirection((prevDirection) => {
    if (
      (newDirection % 2 === 0 && prevDirection % 2 === 0) ||
      (newDirection % 2 !== 0 && prevDirection % 2 !== 0)
    ) {
      return prevDirection;
    }
    return newDirection;
  });
};

export const getScore = (snakeLength) => {
  return (snakeLength - SNAKE_START_POSITION.length) * 100;
};
