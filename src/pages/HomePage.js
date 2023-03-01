import { useState } from "react";
import classes from "./HomePage.module.css";
import StartWindow from "../Components/StartWindow";
import LoginWindow from "../Components/LoginWindow";
import CreateUserWindow from "../Components/CreateUserWindow";
import ChoosePokemonWindow from "../Components/ChoosePokemonWindow";

const HomePage = () => {
  const [isStartWindowDisplay, setStartWindowDisplay] = useState(true);
  const [isLoginWindowDisplay, setLoginWindowDisplay] = useState(false);
  const [isCreateUserWindowDisplay, setCreateUserWindowDisplay] =
    useState(false);
  const [isChoosePokemonDisplay, setChoosePokemonDisplay] = useState(false);

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

  const handleUserCreated = () => {
    setCreateUserWindowDisplay(false);
    setChoosePokemonDisplay(true);
  };

  const HandleChosenPokemon = (chosenPokemonID) => {
    if (chosenPokemonID === "back-btn") {
        setChoosePokemonDisplay(false)
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
          {isCreateUserWindowDisplay && (
            <CreateUserWindow
              onBtnClick={createUserClickHandler}
              onCreatedUser={handleUserCreated}
            />
          )}
          {isChoosePokemonDisplay && (
            <ChoosePokemonWindow 
            onPokemonClick={HandleChosenPokemon} />
          )}
        </div>
      </main>
    </>
  );
};
export default HomePage;
