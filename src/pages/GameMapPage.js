import { Link } from "react-router-dom";
import classes from "./GameMap.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { locationsArray } from "../Data/LocationsData";
import Pokedex from "../Components/Pokedex";


import { useActiveUSerContext } from "../context/ActiveUserContext";
import { testUser } from "../Data/UserData";


const GameMapPage = () => {
  const {activeUser, setActiveUser} = useActiveUSerContext()
  const navigate = useNavigate();


  const clickHandler = (e) => {
    navigate(`/map/${e.target.id}`);
  };

  //!I will have to set the active user after registration! not here. this is just a test
  useEffect(() => {
    setActiveUser(testUser);
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
      </main>
    </>
  );
};
export default GameMapPage;
