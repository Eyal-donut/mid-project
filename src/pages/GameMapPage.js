import { Link } from "react-router-dom";
import classes from "./GameMap.module.css";
import { useNavigate } from "react-router-dom";
import { locationsArray } from "../Data/LocationsData";
import Pokedex from "../Components/Pokedex";

const GameMapPage = () => {
  const navigate = useNavigate();

  const clickHandler = (e) => {
    //on click - set an array of monsters with a level according to the player's pokemon (no need to save them, because you'll generate every time you go to the location with useEffect, and then navigate to where you need.)
    navigate(`/map/${e.target.id}`);
  };

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
      </main>
    </>
  );
};
export default GameMapPage;
