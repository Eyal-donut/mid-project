import { useEnemiesContext } from "../context/EnemiesContext ";

const useEnemiesArray = (user, locationID) => {
  const ENEMY_DIFF_FROM_PLAYER = 6;
  const ENEMY_HEALTH = 130;
  const ENEMY_MAX_HEALTH = 130;

  const { enemiesArray, setEnemiesArray } = useEnemiesContext();

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

  const localStoragePokemonsData = JSON.parse(
    localStorage.getItem("pokemonsData")
  );
  const tempArray = localStoragePokemonsData.map(
    (enemy) =>
      (enemy = {
        id: enemy.id,
        name: enemy.name,
        eventNumber: enemy.eventNumber,
        imageUrl: enemy.imageUrl,
        health: ENEMY_HEALTH,
        maxHealth: ENEMY_MAX_HEALTH,
        attacks: {
          attackOne: enemy.attacks[0],
          attackTwo: enemy.attacks[1],
        },
        strength: RandomLowerOrHigher(user.strength),
        defense: RandomLowerOrHigher(user.defense),
        level: RandomLowerOrHigher(user.level),
      })
  );

  const filterByIDRange = (firstId, lastId) => {
    return tempArray.filter(
      (enemy) => enemy.id >= firstId && enemy.id <= lastId
    );
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
