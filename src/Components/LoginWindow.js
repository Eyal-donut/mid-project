import NestedWindow from "./utils/NestedWindow";
import classes from "../pages/HomePage.module.css";

const LoginWindow = ({ onBtnClick }) => {
  const clickHandler = (e) => {
    onBtnClick(e.target.id);
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    /*on submit: 
    -get user from API. 
        If exists:
        - State management: setUserLoggedIn(true) setLoggedUser(userID) 
        If not: show message:
        - we didn't find your user in our system, please go back and create a new user or play without logging in.
        */
  };

  return (
    <>
      <NestedWindow>
        <h1 className={classes.h1}>Login</h1>
        <form onSubmit={formSubmitHandler}>
          <ul>
            <li>
              <label htmlFor="username">Username: </label>
              <input name="username" type="text" />
            </li>
            <li>
              <label htmlFor="password">Password: </label>
              <input name="password" type="password" />
            </li>
          </ul>
        </form>
        <div className={classes.buttonsWrap}>
          <button
            id="back-btn"
            className={classes.button}
            onClick={clickHandler}
          >
            Back
          </button>
          <button className={classes.button} type="submit">
            Login
          </button>
        </div>
      </NestedWindow>
    </>
  );
};

export default LoginWindow;
