import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { locationsArray } from "../Data/LocationsData";
import { useLocationContext } from "../context/CurrentLocationContext";
import classes from "./LocationPage.module.css";

const testEnemy = {
  id: 0,
  number: 'one',
  strength: 3,
  defense: 3,
  skillPoints: 3,
  attacks: ['speed', 'fireball'],
  healthPoints: 100,
  xpReward: 5,
  location: 'location-one',
  imageUrl: `../assets/enemies/${this.id}`,
  className: `${classes.one}`,
}

const LocationPage = () => {
  // const [currentEnemy, setCurrentEnemy]= useState(testEnemy)
  //create a global Pokedex context containing: the isPokedexUpdated state, pokedexShownPokemons state, userPokemons state, isPokedexDisplay state

//after choosing a location - generate array of enemies, with the level according to player level(player level- avg of his pokemons)
//each enemy has the following qualities: strength, defense, skillPoints (will I hurt you or give you a chance to dodge) array of attacks(chosen randomly), health points (100), xp-reward, location, photo, location on the map (defined by className).

  const { currentLocation, setCurrentLocation } = useLocationContext();
  const params = useParams();

  useEffect(() => {
    const locationByID = locationsArray.find(
      (location) => location.id === params.locationID
    );
    setCurrentLocation(locationByID);
  }, [params.locationID, setCurrentLocation]);

  return (
    <>
      <main
        className={classes.main}
        style={{
          background: `url(${currentLocation.imageUrl}) no-repeat center center/cover`,
        }}
      >
        <h1>{currentLocation.name}</h1>
        <Link to=".." relative="path">
          <button>game map</button>
        </Link>
        <p>{currentLocation.description}</p>
        {/* <div 
        className={`${classes.enemy} ${currentEnemy.className}`}
        style={{
          background: `url(${currentEnemy.imageUrl}) no-repeat center center/cover`,
        }}
        ></div> */}
      </main>
    </>
  );
};

export default LocationPage;
