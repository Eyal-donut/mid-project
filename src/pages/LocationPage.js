import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { locationsArray } from "../Data/LocationsData";
import { useLocationContext } from "../context/CurrentLocationContext";
import classes from "./LocationPage.module.css";
import Pokedex from "../Components/Pokedex";
import { useEnemiesContext } from "../context/EnemiesContext";
import { useActiveUSerContext } from "../context/ActiveUserContext";
import useEnemiesArray from "../hooks/useEnemiesArray";
import EnemyEventPointer from "../Components/EnemyEventPointe";

//create a global Pokedex context containing: the isPokedexUpdated state, pokedexShownPokemons state, userPokemons state, isPokedexDisplay state

//after choosing a location - generate array of enemies, with the level according to player level(player level- avg of his pokemons)
//each enemy has the following qualities: strength, defense, skillPoints (will I hurt you or give you a chance to dodge) array of attacks(chosen randomly), health points (100), xp-reward, location, photo, location on the map (defined by className).

const LocationPage = () => {
  const {activeUser} = useActiveUSerContext()
  const params = useParams();
  const { currentLocation, setCurrentLocation } = useLocationContext();
  const {currentEnemy, setCurrentEnemy} = useEnemiesContext()

  const {enemiesArray, setEnemiesArrayByLocationID} = useEnemiesArray(activeUser, params.locationID)

  const navigate = useNavigate();

  useEffect(() => {
    const locationByID = locationsArray.find(
      (location) => location.id === params.locationID
      );
      setCurrentLocation(locationByID);
      setEnemiesArrayByLocationID()
  }, []);

  const clickHandler = (clickedID) => {
    console.log(clickedID)
    setCurrentEnemy(enemiesArray.find((enemy)=> enemy.id === Number(clickedID)))
    navigate(`${clickedID}`)
  }

  return (
    <>
      <Pokedex/>
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

        {enemiesArray.map((enemy, index)=>

        <EnemyEventPointer key={`${enemy.name} ${enemy.id}` } id={enemy.id} identifier={enemy.id} className={`enemy${index}`} onBtnClick={clickHandler}/>

        )}
        

        {/* here it's not a current enemy, but map for enemies */}
        {/* <div className={`${classes.enemyEvent} ${currentEnemy.className}`} onClick={clickHandler} id={currentEnemy.id}/> */}
      </main>
    </>
  );
};

export default LocationPage;
