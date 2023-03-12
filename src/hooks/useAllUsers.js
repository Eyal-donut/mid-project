import { useUsersContext } from "../context/UsersContext";
import { useLoggedUsersContext } from "../context/LoggedUserContext";
import { useCurrentPokemonContext } from "../context/CurrentPokemonContext";
import UsersDataBaseAPI from "../Data/API";

export const useAllUsers = () => {
  const { setUsers, setKeys } = useUsersContext();
  const { setLoggedUserKey, setLoggedUser } = useLoggedUsersContext();
  const { setCurrentPokemon } = useCurrentPokemonContext();

  
  const fetchUsersAndSetUsersKeysLoggedUserLoggedKeyCurrentPokemon = async () => {
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
    }
  };
  return { fetchUsersAndSetUsersKeysLoggedUserLoggedKeyCurrentPokemon };
};
