import { useState, useEffect } from "react";
import classes from "./HomePage.module.css";
import StartWindow from "../Components/StartWindow";
import LoginWindow from "../Components/LoginWindow";
import CreateUserWindow from "../Components/CreateUserWindow";
import ChoosePokemonWindow from "../Components/ChoosePokemonWindow";
import UsersDataBaseAPI from "../Data/API";
import { useUsersContext } from "../context/UsersContext";
import { pokemonsData } from "../Data/PokemonsData";
import { useLoggedUsersContext } from "../context/LoggedUserContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { users, setUsers, keys, setKeys } = useUsersContext();
  const {loggedUserKey, setLoggedUserKey, loggedUser, setLoggedUser} = useLoggedUsersContext()

  const navigate = useNavigate()

  const getAllUsersAndSetUsersContext = async () => {
    const fetchedUsers = await UsersDataBaseAPI.getAllUsers();
    setUsers(fetchedUsers);
    const keys = UsersDataBaseAPI.getKeys(fetchedUsers);
    setKeys(keys);
  };


  const addUserAndUpdateKeysContext = async (userName, password) => {
    try {
      const response = await UsersDataBaseAPI.users.post(".json", {userName, password})
      setLoggedUserKey(response.data.name)
      setKeys((prev)=> [...prev, response.data.name])
      
    } catch (error) {
      console.log("Error adding user", error)
    }
  }


  useEffect(() => {
    getAllUsersAndSetUsersContext();
  }, []);


  //! define global context and then use the isUserLogged state to determine if you show the start window or not
  const [isStartWindowDisplay, setStartWindowDisplay] = useState(true);
  const [isLoginWindowDisplay, setLoginWindowDisplay] = useState(false);
  const [isCreateUserWindowDisplay, setCreateUserWindowDisplay] =
    useState(false);
  const [isChoosePokemonDisplay, setChoosePokemonDisplay] = useState(false);

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
      setChoosePokemonDisplay(true);
      addUserAndUpdateKeysContext(userName, password)
      setLoggedUser({userName, password})
    }
  };

  const HandleChosenPokemon = (chosenPokemonName) => {
    if (chosenPokemonName === "back-btn") {
      setChoosePokemonDisplay(false);
      setStartWindowDisplay(true);
    } else {
      const chosenPokemon = pokemonsData.find((pokemon)=> pokemon.name.toLowerCase()  === chosenPokemonName)
      const updatedData = {
        ...loggedUser, 
        pokemons: {
          [chosenPokemon.id] : {
            name: chosenPokemon.name,
            // attacks: {attack1: chosenPokemon.attacks[0], attack2: chosenPokemon.attacks[1]}, If you have time add all pokemons attacks...
            strength: 3,
            defense: 3,
            skillPoints: 3,
          }
        }
      }
      UsersDataBaseAPI.editUser(updatedData, loggedUserKey)
      navigate("/map");
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
          {isChoosePokemonDisplay && (
            <ChoosePokemonWindow onPokemonClick={HandleChosenPokemon} />
          )}
        </div>
      </main>
    </>
  );
};
export default HomePage;
