import { Link } from "react-router-dom";
import classes from "./GameMap.module.css";
import { useNavigate } from "react-router-dom";

const locationsArray = [
  {
    name: "location 1",
    id: "location-one",
    className: `${classes.one}`,
  },
  {
    name: "location 2",
    id: "location-two",
    className: `${classes.two}`,
  },
  {
    name: "location 3",
    id: "location-three",
    className: `${classes.three}`,
  },
  {
    name: "location 4",
    id: "location-four",
    className: `${classes.four}`,
  },
];

const GameMapPage = () => {
  const navigate = useNavigate();

  const clickHandler = (e) => {
    //on click - set an array of monsters with a level according to the player's pokemon (no need to save them, because you'll generate every time you go to the location with useEffect, and then navigate to where you need.)
    navigate(`/map/${e.target.id}`);
  };

  return (
    <>
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
