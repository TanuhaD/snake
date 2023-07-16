import { BOX_SIZE } from "../../constants";
import css from "./Box.module.css";
const Box = ({ isFilled }) => {
  return (
    <div
      style={{
        height: `${BOX_SIZE}px`,
        width: `${BOX_SIZE}px`,
        backgroundColor: isFilled ? "red" : "none",
      }}
      className={css.box}
    ></div>
  );
};

export default Box;
