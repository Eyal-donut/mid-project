import classes from "./GameMap.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setLocalStoragePokemonsData } from "../helpers/LocalStorageManagement";
import { locationsArray } from "../Data/LocationsData";
import Pokedex from "../Components/Pokedex";
import Announcer from "../Components/Announcer";

const GameMapPage = () => {
  const navigate = useNavigate();

  const clickHandler = (e) => {
    navigate(`/map/${e.target.id}`);
  };

  useEffect(() => {
    setLocalStoragePokemonsData();
  }, []);

  return (
    <>
      <Pokedex />
      <main className={classes.main}>
        <div className={classes.cover}>
          <h1 className={classes.h1}>Game Map</h1>

          {locationsArray.map((location) => {
            return (
              <div
                key={location.id}
                className={`${classes.wrapper} ${location.className}`}
              >
                <h2 className={classes.h2}>{location.name}</h2>
                <div
                  id={location.id}
                  className={classes.location}
                  onClick={clickHandler}
                ></div>
              </div>
            );
          })}
          <Link to="/">
            <button>Home</button>
          </Link>
        </div>
        <Announcer
          className={classes.mapAnnouncer}
          message="Explore the Pokémon world and look for Pokémons to catch!"
        />
      </main>
    </>
  );
};
export default GameMapPage;
