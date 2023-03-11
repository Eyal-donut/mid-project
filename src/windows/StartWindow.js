import NestedWindow from "../Components/utils/NestedWindow";
import classes from '../pages/HomePage.module.css'
// import { Link } from "react-router-dom";


const StartWindow = ({onBtnClick}) => {
    const clickHandler = (e) => {
        onBtnClick(e.target.id)
    }

  return (
    <>
      <NestedWindow>
        <h2 className={classes.h1}>Go catch 'em all!</h2>
        <div className={classes.buttonsWrap}>
          <button
            id="login-btn"
            className={classes.button}
            onClick={clickHandler}
          >
            Login
          </button>
          <button
            id="create-user-btn"
            className={classes.button}
            onClick={clickHandler}
          >
            Create user
          </button>
          {/* <Link to="/map"> */}
            <button id="play-btn" className={classes.button}
            onClick={clickHandler}>
              Play without login
            </button>
          {/* </Link> */}
        </div>
        <p>Create a user or login to automatically save your game progress!</p>
      </NestedWindow>
    </>
  );
};
export default StartWindow;
