import classes from "./UserStartWindow.module.css";
import { Link } from "react-router-dom";

const UserStartWindow = ({onBtnClick}) => {

  const clickHandler = () => {
    onBtnClick()
  };

  return (
    <>
      <div className={classes.buttonsWrap}>
        <button
          id="logout-btn"
          className={classes.button}
          onClick={clickHandler}
        >
          Logout
        </button>
        <Link to="/map">
          <button id="play-btn" className={classes.button}>
            Play
          </button>
        </Link>
      </div>
    </>
  );
};

export default UserStartWindow;
