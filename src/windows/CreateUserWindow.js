import NestedWindow from "../Components/utils/NestedWindow";
import classes from "../pages/HomePage.module.css";
import { useRef, useState } from "react";

const CreateUserWindow = ({ onBtnClick }) => {
  const [isInvalidPassword, setInvalidPassword] = useState(false);
  const [isInvalidUserName, setInvalidUsername] = useState(false);

  const userNameRef = useRef(null);
  const passwordRef = useRef(null);

  const inputHandler = (e) => {
    setTimeout(() => {
      if (e.target.name === "username") {
        if (!e.target.value.length > 0) setInvalidUsername(true);
        else setInvalidUsername(false);
      }
      if (e.target.name === "password") {
        if (e.target.value.length <= 5) setInvalidPassword(true);
        else setInvalidPassword(false);
      }
    }, 500);
  };
  const clickHandler = (e) => {
    e.preventDefault();

    if (e.target.id === "next") {
      if (!isInvalidPassword && !isInvalidUserName) {
        onBtnClick(
          e.target.id,
          userNameRef.current.value,
          passwordRef.current.value
        );
      }
    }
    if (e.target.id === "back-btn") {
      onBtnClick(e.target.id);
    }
  };

  return (
    <>
      <NestedWindow>
        <h2 className={classes.h1}>Set username and password</h2>
        <form>
          <ul>
            <li>
              <label
                htmlFor="username"
                className={isInvalidUserName ? classes.error : ""}
              >
                Username:
              </label>
              <input
                name="username"
                type="text"
                ref={userNameRef}
                onChange={inputHandler}
              />
            </li>
            <li>
              <label
                htmlFor="password"
                className={isInvalidPassword ? classes.error : ""}
              >
                Password:
              </label>
              <input
                name="password"
                type="password"
                ref={passwordRef}
                onChange={inputHandler}
              />
            </li>
            {isInvalidUserName && <li>Invalid username</li>}
            {isInvalidPassword && <li>Invalid password</li>}
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
          <button id="next" className={classes.button} onClick={clickHandler}>
            Next
          </button>
        </div>
      </NestedWindow>
    </>
  );
};

export default CreateUserWindow;
