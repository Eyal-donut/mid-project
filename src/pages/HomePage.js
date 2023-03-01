import { Link } from "react-router-dom";
import { useState } from "react";
import classes from "./HomePage.module.css";
import StartWindow from "../Components/StartWindow";
import LoginWindow from "../Components/LoginWindow";

const HomePage = () => {
  const [isStartWindowDisplay, setStartWindowDisplay] = useState(true);
  const [isLoginWindowDisplay, setLoginWindowDisplay] = useState(false);

  const startClickHandler = (BtnID) => {
    setStartWindowDisplay(false);
    if (BtnID === "login-btn") setLoginWindowDisplay(true);
  };

  const loginClickHandler = (BtnID) => {
    if (BtnID === "back-btn") {
        setLoginWindowDisplay(false);
        setStartWindowDisplay(true)
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
          <Link to="/map">
            <button>Game map Page</button>
          </Link>
        </div>
      </main>
    </>
  );
};
export default HomePage;
