
import { pokemonsData } from "../Data/PokemonsData";


export const setLocalStoragePokemonsData = () => {
  const localStorageEnemiesArray = 
    localStorage.getItem("pokemonsData")

  if (!localStorageEnemiesArray) {
    localStorage.setItem("pokemonsData", JSON.stringify(pokemonsData))
  }
};
