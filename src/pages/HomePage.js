import { useState, useEffect } from "react";
import classes from "./HomePage.module.css";
import StartWindow from "../Components/StartWindow";
import LoginWindow from "../Components/LoginWindow";
import CreateUserWindow from "../Components/CreateUserWindow";
import ChoosePokemonWindow from "../Components/ChoosePokemonWindow";
import UsersDataBaseAPI from "../Data/API";
import { useUsersContext } from "../context/UsersContext";

const HomePage = () => {
  const { setUsers, setKeys } = useUsersContext();

  const getAllUsersAndSetUsersContext = async () => {
    const fetchedUsers = await UsersDataBaseAPI.getAllUsers();
    setUsers(fetchedUsers)
    const keys = UsersDataBaseAPI.getKeys(fetchedUsers);
    setKeys(keys)
  };

  useEffect(() => {
    getAllUsersAndSetUsersContext();
  }, []);

  //! define global context and then use the isUserLogged state to determine if you show the start window or not
  const [isStartWindowDisplay, setStartWindowDisplay] = useState(true);
  const [isLoginWindowDisplay, setLoginWindowDisplay] = useState(false);
  const [isCreateUserWindowDisplay, setCreateUserWindowDisplay] =
    useState(false);
  const [isChoosePokemonDisplay, setChoosePokemonDisplay] = useState(false);

  const [newUser, setNewUser] = useState({});

  const startClickHandler = (btnID) => {
    setStartWindowDisplay(false);
    if (btnID === "login-btn") setLoginWindowDisplay(true);
    if (btnID === "create-user-btn") {
      setCreateUserWindowDisplay(true);
    }
  };

  const loginClickHandler = (btnID) => {
    setLoginWindowDisplay(false);
    if (btnID === "back-btn") {
      setStartWindowDisplay(true);
    }
    //if btn ID === login....
  };

  const createUserClickHandler = (btnID, userName, password) => {
    setCreateUserWindowDisplay(false);
    if (btnID === "back-btn") {
      setStartWindowDisplay(true);
    } else {
      setNewUser({ userName, password });
      setChoosePokemonDisplay(true);
    }
  };

  const HandleChosenPokemon = (chosenPokemonID) => {
    if (chosenPokemonID === "back-btn") {
      setChoosePokemonDisplay(false);
      setStartWindowDisplay(true);
    }
    if (chosenPokemonID === "pikachu") {
    }
    if (chosenPokemonID === "bulbasaur") {
    }
    if (chosenPokemonID === "squirtle") {
    }
    // if (e.target.id !== "back-btn") {
    //   setTimeout(() => {
    //     navigate("/map");
    //   }, 700);
    // }
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
          {isChoosePokemonDisplay && (
            <ChoosePokemonWindow onPokemonClick={HandleChosenPokemon} />
          )}
        </div>
      </main>
    </>
  );
};
export default HomePage;
