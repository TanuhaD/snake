import { useEffect, useState } from "react";
import { PLAYING_FIELD_HEIGHT, PLAYING_FIELD_WIDTH } from "../../constants";
import Box from "../Box/Box";
import css from "./PlayingField.module.css";

const field = [];
for (let i = 0; i < PLAYING_FIELD_WIDTH; i++) {
  const row = [];
  field.push(row);
  for (let j = 0; j < PLAYING_FIELD_HEIGHT; j++) {
    row.push({ num: i * PLAYING_FIELD_WIDTH + j, isFilled: false });
  }
}

const PlayingField = ({ snake, isGameOver, setIsGameOver, deletedElem }) => {
  const [playingField, setPlayingField] = useState(field);

  useEffect(() => {
    const head = snake.at(-1);
    if (
      head.x >= PLAYING_FIELD_WIDTH ||
      head.x <= 0 ||
      head.y >= PLAYING_FIELD_HEIGHT ||
      head.y <= 0
    ) {
      setIsGameOver(true);
    }
  }, [setIsGameOver, snake]);

  useEffect(() => {
    const head = snake.at(-1);
    if (
      head.x >= PLAYING_FIELD_WIDTH ||
      head.x <= 0 ||
      head.y >= PLAYING_FIELD_HEIGHT ||
      head.y <= 0
    ) {
      return;
    }
    let newField = [...field];
    snake.forEach((elem) => {
      newField[elem.x][elem.y].isFilled = true;
    });
    if (deletedElem) {
      console.log(deletedElem);
      newField[deletedElem.x][deletedElem.y].isFilled = false;
    }
    setPlayingField(newField);
  }, [deletedElem, snake]);

  let matrix = "";
  for (let i = 0; i < PLAYING_FIELD_WIDTH; i++) {
    for (let j = 0; j < PLAYING_FIELD_HEIGHT; j++) {
      matrix += playingField[i][j].isFilled ? "1 " : "0 ";
    }
    matrix += "\n";
  }
  console.log(matrix);

  // if (isGameOver) {
  //   return <div>Game Over</div>;
  // }
  return (
    <ul className={css.boxRow}>
      {playingField.map((column, x) => {
        return (
          <li key={x}>
            <ul className={css.boxColum}>
              {column.map((elem) => {
                if (elem.isFilled) {
                  console.log("num: ", elem.num);
                  console.log("filled");
                }
                return (
                  <li key={elem.num}>
                    <Box isFilled={elem.isFilled} />
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export default PlayingField;
