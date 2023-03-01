import { Link } from "react-router-dom";
import { useState } from "react";
import classes from "./HomePage.module.css";
import StartWindow from "../Components/StartWindow";
import LoginWindow from "../Components/LoginWindow";
import CreateUserWindow from "../Components/CreateUserWindow";

const HomePage = () => {
  const [isStartWindowDisplay, setStartWindowDisplay] = useState(true);
  const [isLoginWindowDisplay, setLoginWindowDisplay] = useState(false);
  const [isCreateUserWindowDisplay, setCreateUserWindowDisplay] = useState(false);

  const startClickHandler = (btnID) => {
    setStartWindowDisplay(false);
    if (btnID === "login-btn") setLoginWindowDisplay(true);
    if (btnID === "create-user-btn") setCreateUserWindowDisplay(true);
  };

  const loginClickHandler = (btnID) => {
    setLoginWindowDisplay(false);
    if (btnID === "back-btn") {
      setStartWindowDisplay(true);
    }
  };

  const createUserClickHandler = (btnID) => {
    setCreateUserWindowDisplay(false);
    if (btnID === "back-btn") {
      setStartWindowDisplay(true);
    }
  };

  return (
    <>
      <main className={classes.main}>
        <div className={classes.cover}>
          <div className={classes.logo} />
          {isStartWindowDisplay && (
            <StartWindow onBtnClick={startClickHandler} />
          )}
          {isLoginWindowDisplay && (
            <LoginWindow onBtnClick={loginClickHandler} />
          )}
          {isCreateUserWindowDisplay && (
            <CreateUserWindow onBtnClick={createUserClickHandler} />
          )}

          <Link to="/map">
            <button>Game map Page</button>
          </Link>
        </div>
      </main>
    </>
  );
};
export default HomePage;
