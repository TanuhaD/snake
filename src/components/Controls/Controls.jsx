import { DIRECTIONS } from "../../constants";
import { hadleChangeDirectionSnake } from "../../utils/utils";
import css from "./Controls.module.css";
import PropTypes from "prop-types";

const Controls = ({ setDirection }) => {
  return (
    <div className={css.wrapperBtn}>
      <button
        className={css.controlBtn}
        type="button"
        onClick={() =>
          hadleChangeDirectionSnake({
            newDirection: DIRECTIONS.left,
            setDirection,
          })
        }
      >
        left
      </button>
      <div className={css.boxBtn}>
        <button
          className={css.controlBtn}
          type="button"
          onClick={() =>
            hadleChangeDirectionSnake({
              newDirection: DIRECTIONS.up,
              setDirection,
            })
          }
        >
          up
        </button>
        <button
          className={css.controlBtn}
          type="button"
          onClick={() =>
            hadleChangeDirectionSnake({
              newDirection: DIRECTIONS.down,
              setDirection,
            })
          }
        >
          down
        </button>
      </div>

      <button
        className={css.controlBtn}
        type="button"
        onClick={() =>
          hadleChangeDirectionSnake({
            newDirection: DIRECTIONS.right,
            setDirection,
          })
        }
      >
        right
      </button>
    </div>
  );
};
Controls.propTypes = {
  setDirection: PropTypes.func,
};
export default Controls;
