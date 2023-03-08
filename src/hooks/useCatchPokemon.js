//this hook will update the user, the enemies array in local storage, and the loggedUserState
import { useEnemiesContext } from "../context/EnemiesContext ";
import { useLoggedUsersContext } from "../context/LoggedUserContext";
import UsersDataBaseAPI from "../Data/API";

export const useCatchPokemon = () => {
  const { currentEnemy } = useEnemiesContext();
  const { loggedUser, setLoggedUser, loggedUserKey } = useLoggedUsersContext();

  const updatedData = {
    ...loggedUser,
    pokemons: {
        ...loggedUser.pokemons,
      [currentEnemy.id]: { ...currentEnemy },
    },
  };
  const removePokemonFromEnemies = () => {
    const localStoragePokemonsData = JSON.parse(
      localStorage.getItem("pokemonsData")
    );
    const filtered = localStoragePokemonsData.filter(
      (pokemon) => pokemon.id !== currentEnemy.id
    );

    localStorage.setItem("pokemonsData", JSON.stringify(filtered));
  };

  const updateUserPokemons = () => {
    localStorage.setItem("loggedUser", JSON.stringify({ ...updatedData }));
    setLoggedUser(updatedData);
    UsersDataBaseAPI.editUser(updatedData, loggedUserKey);
  };

  return {
    removePokemonFromEnemies,
    updateUserPokemons
  };
};
