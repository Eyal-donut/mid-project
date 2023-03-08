import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { locationsArray } from "../Data/LocationsData";
import { useLocationContext } from "../context/CurrentLocationContext";
import classes from "./LocationPage.module.css";
import Pokedex from "../Components/Pokedex";
import useEnemiesArray from "../hooks/useEnemiesArray";
import EnemyEventPointer from "../Components/EnemyEventPointe";
import { useCurrentPokemonContext } from "../context/CurrentPokemonContext";
import Announcer from "../Components/Announcer";

const LocationPage = () => {
  const params = useParams();
  const { currentLocation, setCurrentLocation } = useLocationContext();
  const { currentPokemon, setCurrentPokemon } = useCurrentPokemonContext();

  useEffect(() => {
    setCurrentPokemon(JSON.parse(localStorage.getItem("currentPokemon")));
  }, [setCurrentPokemon]);

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
    localStorage.setItem("currentLocation", JSON.stringify(locationByID));
    setEnemiesArrayByLocationID();
  }, [setCurrentLocation]);

  const clickHandler = (clickedID) => {
    const tempCurrentEnemy = enemiesArray.find(
      (enemy) => enemy.id === Number(clickedID)
    );

    localStorage.setItem("currentEnemy", JSON.stringify(tempCurrentEnemy));
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
          <button>Map</button>
        </Link>
        <Announcer message={currentLocation.description}/>

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
