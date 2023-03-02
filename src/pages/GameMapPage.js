import { Link } from "react-router-dom";
import classes from "./GameMap.module.css";

const GameMapPage = () => {
  const locationID = 1;
  return (
    <>
      <main className={classes.main}>
        <div className={classes.cover}>
          <h1 className="game-map">Game Map</h1>
          <div className={`${classes.location} ${classes.three}`}>3</div>
          <div className={`${classes.location} ${classes.four}`}>4</div>
          <div className={`${classes.location} ${classes.one}`}>1</div>
          <div className={`${classes.location} ${classes.two}`}>2</div>
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to={`/map/${locationID}`}>
            <button>Chosen location</button>
          </Link>
        </div>
      </main>
    </>
  );
};
export default GameMapPage;
