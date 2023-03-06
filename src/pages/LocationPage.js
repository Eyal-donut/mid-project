import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { locationsArray } from "../Data/LocationsData";
import { useLocationContext } from "../context/CurrentLocationContext";
import classes from "./LocationPage.module.css";
import Pokedex from "../Components/Pokedex";
import { useEnemiesContext } from "../context/EnemiesContext ";
import useEnemiesArray from "../hooks/useEnemiesArray";
import EnemyEventPointer from "../Components/EnemyEventPointe";
import { testUser } from "../Data/UserData";
import { useCurrentPokemonContext } from "../context/CurrentPokemonContext";

//create a global Pokedex context containing: the isPokedexUpdated state, pokedexShownPokemons state, userPokemons state, isPokedexDisplay state

const LocationPage = () => {
  const params = useParams();
  const { currentLocation, setCurrentLocation } = useLocationContext();
  const { currentEnemy, setCurrentEnemy } = useEnemiesContext();
  const { currentPokemon } = useCurrentPokemonContext();

  //change that, so enemy is adapted to the avg pokemons level of the user, and not the current pokemon

  const { enemiesArray, setEnemiesArrayByLocationID } = useEnemiesArray(
    currentPokemon,
    params.locationID
  );

  const navigate = useNavigate();

  useEffect(() => {
    const locationByID = locationsArray.find(
      (location) => location.id === params.locationID
    );
    setCurrentLocation(locationByID);
    setEnemiesArrayByLocationID();
  }, []);

  const clickHandler = (clickedID) => {
    setCurrentEnemy(
      enemiesArray.find((enemy) => enemy.id === Number(clickedID))
    );
    navigate(`${clickedID}`);
  };



  return (
    <>
      <Pokedex />
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

        {enemiesArray.map((enemy, index) => (
          <EnemyEventPointer
            key={`${enemy.name} ${enemy.id}`}
            id={enemy.id}
            identifier={enemy.id}
            className={`enemy${index}`}
            onBtnClick={clickHandler}
          />
        ))}
      </main>
    </>
  );
};

export default LocationPage;
