import css from "./Modal.module.css";
import PropTypes from "prop-types";
const Modal = ({ setRestart }) => {
  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <p>Game Over</p>
        <button onClick={() => setRestart(true)}>Restart Game</button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  setRestart: PropTypes.func,
};

export default Modal;
