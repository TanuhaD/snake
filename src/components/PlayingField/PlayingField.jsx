import { PLAYING_FIELD_HEIGHT, PLAYING_FIELD_WIDTH } from "../../constants";
import Box from "../Box/Box";
import css from "./PlayingField.module.css";
import PropTypes from "prop-types";

const field = [];
for (let i = 0; i < PLAYING_FIELD_WIDTH; i++) {
  const row = [];
  field.push(row);
  for (let j = 0; j < PLAYING_FIELD_HEIGHT; j++) {
    row.push({ num: i * PLAYING_FIELD_WIDTH + j, isFilled: false });
  }
}

const PlayingField = ({ snake, foodCoords }) => {
  return (
    <ul className={css.boxRow}>
      {field.map((column, x) => {
        return (
          <li key={x} className={css.boxItem}>
            <ul className={css.boxColum}>
              {column.map((elem, y) => {
                let isFilled = false;
                let isFood = false;
                snake.forEach((section) => {
                  if (section.x === x && section.y === y) {
                    isFilled = true;
                  }
                });
                if (foodCoords.x === x && foodCoords.y === y) {
                  isFood = true;
                }
                return (
                  <li key={elem.num}>
                    <Box
                      isFilled={isFilled}
                      isFood={isFood}
                      isLastColumn={x === PLAYING_FIELD_WIDTH - 1}
                      isLastRow={y === PLAYING_FIELD_HEIGHT - 1}
                    />
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
PlayingField.propTypes = {
  snake: PropTypes.array,
  foodCoords: PropTypes.object,
};

export default PlayingField;
