import { useState, useEffect } from "react";
import classes from "./HomePage.module.css";
import StartWindow from "../windows/StartWindow";
import LoginWindow from "../windows/LoginWindow";
import UserStartWindow from "../windows/UserStartWindow";
import CreateUserWindow from "../windows/CreateUserWindow";
import ChoosePokemonWindow from "../windows/ChoosePokemonWindow";
import UsersDataBaseAPI from "../Data/API";
import { useUsersContext } from "../context/UsersContext";
import { pokemonsData } from "../Data/PokemonsData";
import { useLoggedUsersContext } from "../context/LoggedUserContext";
import { useNavigate } from "react-router-dom";
import { useCurrentPokemonContext } from "../context/CurrentPokemonContext";
import { useAllUsers } from "../hooks/useAllUsers";

const PLAYER_POKEMON_HEALTH = 130;
const PLAYER_POKEMON_MAX_HEALTH = 130;

const HomePage = () => {
  const { users, setKeys } = useUsersContext();
  const { loggedUserKey, setLoggedUserKey, loggedUser, setLoggedUser } =
    useLoggedUsersContext();
  const { setCurrentPokemon } = useCurrentPokemonContext();

  const [isStartWindowDisplay, setStartWindowDisplay] = useState(true);
  const [isUserStartWindowDisplay, setUserStartWindowDisplay] = useState(false);
  const [isLoginWindowDisplay, setLoginWindowDisplay] = useState(false);
  const [isCreateUserWindowDisplay, setCreateUserWindowDisplay] =
    useState(false);
  const [isChoosePokemonDisplay, setChoosePokemonDisplay] = useState(false);

  const {fetchUsersAndSetUsersKeysLoggedUserLoggedKeyCurrentPokemon} = useAllUsers()

  const navigate = useNavigate();

   const deleteDummyUsers = () => {
    for (const key in users) {
      if (users[key].password === "0") {
        UsersDataBaseAPI.removeUser(key);
      }
    }
  };

  const addUserAndUpdateKeysContext = async (userName, password) => {
    try {
      const response = await UsersDataBaseAPI.users.post(".json", {
        userName,
        password,
      });
      setLoggedUserKey(response.data.name);
      localStorage.setItem("loggedUserKey", JSON.stringify(response.data.name));
      setKeys((prev) => [...prev, response.data.name]);
    } catch (error) {
      console.log("Error adding user", error);
    }
  };

  useEffect(() => {
    fetchUsersAndSetUsersKeysLoggedUserLoggedKeyCurrentPokemon();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const localStorageLoggedUserKey = localStorage.getItem("loggedUserKey");
    if (localStorageLoggedUserKey) {
      setLoggedUserKey(localStorageLoggedUserKey);
      setStartWindowDisplay(false);
      setUserStartWindowDisplay(true);
    }
  },[setLoggedUserKey, setStartWindowDisplay, setUserStartWindowDisplay]);

  const logoutClickHandler = () => {
    deleteDummyUsers()
    setUserStartWindowDisplay(false);
    setStartWindowDisplay(true);
    localStorage.clear();
    setLoggedUserKey("");
    setLoggedUser({});
    setCurrentPokemon({});
  };

  const startClickHandler = (btnID) => {
    setStartWindowDisplay(false);
    if (btnID === "login-btn") setLoginWindowDisplay(true);
    if (btnID === "create-user-btn") {
      setCreateUserWindowDisplay(true);
    }
    if (btnID === "play-btn") {
      createUserClickHandler("play-btn", "dummyUser", "0");
    }
  };

  const loginClickHandler = (btnID) => {
    //login logic is managed in the loginWindow component
    setLoginWindowDisplay(false);
    if (btnID === "back-btn") setStartWindowDisplay(true);
    else navigate("/map");
  };

  const createUserClickHandler = (btnID, userName, password) => {
    setCreateUserWindowDisplay(false);
    if (btnID === "back-btn") {
      setStartWindowDisplay(true);
    } else {
      setChoosePokemonDisplay(true);
      addUserAndUpdateKeysContext(userName, password);
      setLoggedUser({ userName, password });
      localStorage.setItem(
        "loggedUser",
        JSON.stringify({ userName, password })
      );
    }
  };

  const HandleChosenPokemon = (chosenPokemonName) => {
    if (chosenPokemonName === "back-btn") {
      setChoosePokemonDisplay(false);
      setStartWindowDisplay(true);
    } else {
      const chosenPokemon = pokemonsData.find(
        (pokemon) => pokemon.name.toLowerCase() === chosenPokemonName
      );

      const chosenPokemonObject = {
        id: chosenPokemon.id,
        name: chosenPokemon.name,
        imageUrl: chosenPokemon.imageUrl,
        attacks: {
          attackOne: chosenPokemon.attacks[0],
          attackTwo: chosenPokemon.attacks[1],
        },
        strength: 50,
        defense: 30,
        level: 40,
        health: PLAYER_POKEMON_HEALTH,
        maxHealth: PLAYER_POKEMON_MAX_HEALTH,
      };

      const updatedData = {
        ...loggedUser,
        pokemons: {
          first: {
            ...chosenPokemonObject,
          },
        },
      };
      setCurrentPokemon({
        ...chosenPokemonObject,
      });
      localStorage.setItem(
        "currentPokemon",
        JSON.stringify(chosenPokemonObject)
      );
      UsersDataBaseAPI.editUser(updatedData, loggedUserKey);
      setLoggedUser({ ...updatedData });
      localStorage.setItem("loggedUser", JSON.stringify({ ...updatedData }));
      navigate("/map");
    }
  };

  return (
    <>
      <main className={classes.main}>
        <div className={classes.cover}>
          <div className={classes.logo} />
          {isUserStartWindowDisplay && (
            <UserStartWindow onBtnClick={logoutClickHandler} />
          )}
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
