import Announcer from "../Components/Announcer";
import classes from '../pages/HomePage.module.css'

const StartWindow = ({onBtnClick}) => {
    const clickHandler = (e) => {
        onBtnClick(e.target.id)
    }

  return (
    <>
      {/* <NestedWindow> */}
        {/* <h2 className={classes.h1}>Go catch 'em all!</h2> */}
        <div className={`${classes.buttonsWrap} ${classes.startWindowButtonsWrap}`}>
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
        <Announcer message='Create a user or login to save your game progress!' className={classes.homeAnnouncer}/>
        {/* <p>Create a user or login to save your game progress!</p> */}
      {/* </NestedWindow> */}
    </>
  );
};
export default StartWindow;
