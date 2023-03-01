import { Link } from "react-router-dom";
import { useState } from "react";
import classes from "./HomePage.module.css";
import LoginWindow from "../Components/LoginWindow";

const HomePage = () => {
  const [isLoginWindowDisplay, setLoginWindowDisplay] = useState(true);

  const clickHandler = (BtnID) => {
    setLoginWindowDisplay(false);
    if (BtnID === "login-btn") {
    }
  };

  return (
    <>
      <main className={classes.main}>
        <div className={classes.cover}>
          <div className={classes.logo} />
          {isLoginWindowDisplay && <LoginWindow onBtnClick={clickHandler} />}
          {/* If user */}
          <Link to="/map">
            <button>Game map Page</button>
          </Link>
        </div>
      </main>
    </>
  );
};
export default HomePage;
