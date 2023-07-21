import css from "./Modal.module.css";
import PropTypes from "prop-types";
const Modal = ({ restartGame }) => {
  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <p>Game Over</p>
        <button onClick={() => restartGame()}>Restart Game</button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  restartGame: PropTypes.func,
};

export default Modal;
