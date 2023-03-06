import { useState, useEffect } from "react";
import classes from "./HomePage.module.css";
import StartWindow from "../Components/StartWindow";
import LoginWindow from "../Components/LoginWindow";
import UserStartWindow from "../Components/UserStartWindow";
import CreateUserWindow from "../Components/CreateUserWindow";
import ChoosePokemonWindow from "../Components/ChoosePokemonWindow";
import UsersDataBaseAPI from "../Data/API";
import { useUsersContext } from "../context/UsersContext";
import { pokemonsData } from "../Data/PokemonsData";
import { useLoggedUsersContext } from "../context/LoggedUserContext";
import { useNavigate } from "react-router-dom";
import { useCurrentPokemonContext } from "../context/CurrentPokemonContext";

const HomePage = () => {
  const { setUsers, setKeys } = useUsersContext();
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

    if (loggedUserKey.length > 0) {
      for (const key in fetchedUsers) {
        if (
          key === loggedUserKey
        ) {
          setLoggedUserKey(key);
          setLoggedUser(fetchedUsers[key]);
          setCurrentPokemon(fetchedUsers[key].pokemons.first);
          localStorage.setItem("loggedUserKey", JSON.stringify(key));
          localStorage.setItem("loggedUser", JSON.stringify(fetchedUsers[key]));
          localStorage.setItem(
            "currentPokemon",
            JSON.stringify(fetchedUsers[key].pokemons.first)
          );
        }
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
      localStorage.setItem("loggedUserKey", response.data.name);
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
    setUserStartWindowDisplay(false);
    setStartWindowDisplay(true);
    localStorage.removeItem("loggedUserKey");
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("currentPokemon");
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
  };

  const loginClickHandler = (btnID) => {
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
          attack1: chosenPokemon.attacks[0],
          attack2: chosenPokemon.attacks[1],
        },
        strength: 3,
        defense: 3,
        skillPoints: 3,
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
