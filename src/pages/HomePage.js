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

const PLAYER_POKEMON_HEALTH = 100;
const PLAYER_POKEMON_MAX_HEALTH = 100;

const HomePage = () => {
  const { users, setUsers, setKeys } = useUsersContext();
  const { loggedUserKey, setLoggedUserKey, loggedUser, setLoggedUser } =
    useLoggedUsersContext();
  const { setCurrentPokemon } = useCurrentPokemonContext();

  const [isStartWindowDisplay, setStartWindowDisplay] = useState(true);
  const [isUserStartWindowDisplay, setUserStartWindowDisplay] = useState(false);
  const [isLoginWindowDisplay, setLoginWindowDisplay] = useState(false);
  const [isCreateUserWindowDisplay, setCreateUserWindowDisplay] =
    useState(false);
  const [isChoosePokemonDisplay, setChoosePokemonDisplay] = useState(false);

  const navigate = useNavigate();

  const getAllUsersAndSetUsersContext = async () => {
    const fetchedUsers = await UsersDataBaseAPI.getAllUsers();
    setUsers(fetchedUsers);
    const keys = UsersDataBaseAPI.getKeys(fetchedUsers);
    setKeys(keys);

    const localStorageLoggedUserKey = localStorage.getItem("loggedUserKey");

    if (localStorageLoggedUserKey) {
      const foundKey = Object.keys(fetchedUsers).find(
        (key) => key === JSON.parse(localStorageLoggedUserKey)
      );

      setLoggedUserKey(foundKey);
      setLoggedUser(fetchedUsers[foundKey]);
      setCurrentPokemon(fetchedUsers[foundKey].pokemons.first);
      localStorage.setItem("loggedUserKey", JSON.stringify(foundKey));
      localStorage.setItem(
        "loggedUser",
        JSON.stringify(fetchedUsers[foundKey])
      );
      localStorage.setItem(
        "currentPokemon",
        JSON.stringify(fetchedUsers[foundKey].pokemons.first)
      );
      console.log(
        "restarted local storage and set states: loggedUserKey, loggedUser, currentPokemon"
      );
    }
  };

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
    getAllUsersAndSetUsersContext();
  }, []);

  useEffect(() => {
    const localStorageLoggedUserKey = localStorage.getItem("loggedUserKey");
    if (localStorageLoggedUserKey) {
      setLoggedUserKey(localStorageLoggedUserKey);
      setStartWindowDisplay(false);
      setUserStartWindowDisplay(true);
    }
  }, []);

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
