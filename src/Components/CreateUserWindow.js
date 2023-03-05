import NestedWindow from "./utils/NestedWindow";
import classes from "../pages/HomePage.module.css";
import { useRef, useState, useEffect } from "react";
import { useUsersContext } from "../context/UsersContext";

const CreateUserWindow = ({ onBtnClick }) => {
  const { users, keys } = useUsersContext();
  const [isInvalidPassword, setInvalidPassword] = useState(false);
  const [isInvalidUserName, setInvalidUsername] = useState(false);
  const [isTakenUsername, setIsTakenUsername] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false)

  const userNameRef = useRef(null);
  const passwordRef = useRef(null);

  const clickHandler = (e) => {
    e.preventDefault();

    if (e.target.id === "create-user") {
      if (!userNameRef.current.value.length > 0) {
        setInvalidUsername(true);
      } else setInvalidUsername(false);

      if (passwordRef.current.value.length <= 5) {
        setInvalidPassword(true);
      } else setInvalidPassword(false);

      setIsTakenUsername(false);
      for (const key of keys) {
        if (userNameRef.current.value === users[key].userName) {
          console.log("username take");
          setIsTakenUsername(true);
        }
      }
      if (!isInvalidPassword && !isInvalidUserName && !isTakenUsername) {
        setIsFormValid(true)
      }
    }


    
    if (e.target.id === "back-btn") {
      onBtnClick(e.target.id);
    }
  };

  useEffect(() => {
    if (isFormValid) {
      onBtnClick(
        "create-user",
        userNameRef.current.value,
        passwordRef.current.value
      );
    }
    return () => {
      setIsFormValid(false)
    };
  }, [isFormValid]);

  // const formSubmitHandler = (e) => {
  //   if (
  //     //get all the users from the database, compare the users details, if it already exists....
  //     userNameRef.current.value.length > 0 &&
  //     passwordRef.current.value.length >= 6
  //   )

  //     onCreatedUser(userNameRef, passwordRef);
  // };

  return (
    <>
      <NestedWindow>
        <h2 className={classes.h1}>Set username and password</h2>
        <form>
          <ul>
            <li>
              <label
                htmlFor="username"
                className={
                  isInvalidUserName || isTakenUsername ? classes.error : ""
                }
              >
                Username:{" "}
              </label>
              <input name="username" type="text" ref={userNameRef} />
            </li>
            <li>
              <label
                htmlFor="password"
                className={isInvalidPassword ? classes.error : ""}
              >
                Password:{" "}
              </label>
              <input name="password" type="password" ref={passwordRef} />
            </li>
            {isInvalidUserName && <li>Invalid username</li>}
            {isTakenUsername && <li>Username taken</li>}
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
          <button
            id="create-user"
            className={classes.button}
            onClick={clickHandler}
          >
            Continue
          </button>
        </div>
      </NestedWindow>
    </>
  );
};

export default CreateUserWindow;
