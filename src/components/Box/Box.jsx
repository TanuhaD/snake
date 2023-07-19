import { BOX_SIZE } from "../../constants";
import css from "./Box.module.css";
import PropTypes from "prop-types";
const Box = ({ isFilled, isFood, isLastColumn, isLastRow }) => {
  let boxColor = "white";
  if (isFilled) {
    boxColor = "red";
  }
  if (isFood) {
    boxColor = "green";
  }
  return (
    <div
      style={{
        height: `${BOX_SIZE}px`,
        width: `${BOX_SIZE}px`,
        backgroundColor: boxColor,
        borderRight: isLastColumn ? "1px solid black" : "none",
        borderBottom: isLastRow ? "1px solid black" : "none",
      }}
      className={css.box}
    ></div>
  );
};

Box.propTypes = {
  isFilled: PropTypes.bool,
  isFood: PropTypes.bool,
  isLastColumn: PropTypes.bool,
  isLastRow: PropTypes.bool,
};

export default Box;
