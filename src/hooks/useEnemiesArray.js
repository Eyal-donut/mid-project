import { useEnemiesContext } from "../context/EnemiesContext ";
import { pokemonsData } from "../Data/PokemonsData";

import { useState } from "react";

const useEnemiesArray = (user, locationID) => {
  const ENEMY_DIFF_FROM_PLAYER = 2;

  // const [enemiesArray, setEnemiesArray] = useState([]);
  const {enemiesArray, setEnemiesArray} = useEnemiesContext()

  const randomIntFromInterval = (min, max) => {
    let randomInt = Math.floor(Math.random() * (max - min + 1) + min);
    return randomInt <= 0 ? 1 : randomInt;
  };

  const RandomLowerOrHigher = (playerQuality) => {
    return randomIntFromInterval(
      playerQuality - ENEMY_DIFF_FROM_PLAYER,
      playerQuality + ENEMY_DIFF_FROM_PLAYER
    );
  };

  const tempArray = pokemonsData.map(
    (enemy) =>
      (enemy = {
        id: enemy.id,
        name: enemy.name,
        imageUrl: enemy.imageUrl,
        health: 100,
        maxHealth:100,
        strength: RandomLowerOrHigher(user.strength),
        defense: RandomLowerOrHigher(user.defense),
        skillPoints: RandomLowerOrHigher(user.skillPoints),
        xpReward: randomIntFromInterval(1, 5),
      })
  );

  const filterByIDRange = (firstId, lastId) => {
    return tempArray.filter((enemy) => enemy.id >= firstId && enemy.id <= lastId ) ;
  };


  const setEnemiesArrayByLocationID = () => {
    if (locationID === "location-one") setEnemiesArray(filterByIDRange(0, 5));
    if (locationID === "location-two") setEnemiesArray(filterByIDRange(6, 11));
    if (locationID === "location-four")
      setEnemiesArray(filterByIDRange(12, 17));
    if (locationID === "location-three")
      setEnemiesArray(filterByIDRange(18, 23));
  };

  return { enemiesArray, setEnemiesArrayByLocationID };
};

export default useEnemiesArray;
