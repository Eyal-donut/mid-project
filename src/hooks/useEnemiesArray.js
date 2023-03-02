import { useActiveUSerContext } from "../context/ActiveUserContext";
import { useEnemiesContext } from "../context/EnemiesContext";
import { enemiesData } from "../Data/enemiesData";

const useEnemiesArray = (locationID, player) => {

  const { enemiesArray, setEnemiesArray } = useEnemiesContext();
  const { activeUser } = useActiveUSerContext();

  const randomIntFromInterval = (min, max) => {
    let randomInt = Math.floor(Math.random() * (max - min + 1) + min);
    return randomInt <= 0 ? 1 : randomInt;
  };
  const RandomLowerOrHigher = (playerQuality, num) =>
    randomIntFromInterval(playerQuality - num, playerQuality + num);

  const tempArray = enemiesData.map(
    (enemy) =>
      (enemy = {
        id: enemy.id,
        name: enemy.name,
        imageUrl: enemy.imageUrl,
        health: 100,
        strength: RandomLowerOrHigher(player.strength, 2),
        defense: RandomLowerOrHigher(player.defense, 2),
        skillPoints: RandomLowerOrHigher(player.defense, 2),
        xpReward: randomIntFromInterval(1, 5),
      })
  );

  if (locationID === "location-one") {
    
  }
  if (locationID === "location-two") {
  }
  if (locationID === "location-three") {
  }
  if (locationID === "location-four") {
  }
};
