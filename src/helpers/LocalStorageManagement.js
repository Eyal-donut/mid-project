//This updates local storage with enemies array, to be used when home is rendered. 
//it also filters out pokemons that the user has.

//if there is already in local storage: only filter out and set

//if not: filter out from pokemondata
import { pokemonsData } from "../Data/PokemonsData";


export const setLocalStoragePokemonsData = () => {
  const localStorageEnemiesArray = 
    localStorage.getItem("pokemonsData")

  if (!localStorageEnemiesArray) {
    localStorage.setItem("pokemonsData", JSON.stringify(pokemonsData))
  }
};

//this is a right direction, but it doesn't yet work, nor it is implemented anywhere in the app

// const filterPokemonsByUserData = async () => {
//     let filtered = [];
//     const fetchedUsers = await UsersDataBaseAPI.getAllUsers();

//     const localStorageLoggedUserKey = localStorage.getItem("loggedUserKey");
//     for (const key in fetchedUsers) {
//       if (key === localStorageLoggedUserKey) {
//         const pokemonsObj = fetchedUsers[key].pokemons;

//         for (const k in pokemonsObj) {
//           filtered = pokemonsData.filter((pokemon) => pokemon.id !== k);
//         }
//       }
//     }
//     console.log(filtered);
//     localStorage.setItem("pokemonsData", JSON.stringify(filtered));
//   };

