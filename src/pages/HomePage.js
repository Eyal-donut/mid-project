import { Link } from "react-router-dom";
import NestedWindow from "../Components/NestedWindow";
import classes from "./HomePage.module.css";

const HomePage = () => {
  return (
    <>
    <main className={classes.main}>
      <div className={classes.cover}>
        <div className={classes.logo}/>
        <NestedWindow>
            <h1>hi</h1>
        </NestedWindow>
        <Link to="/map">
          <button>Game map Page</button>
        </Link>
      </div>
    </main>

    </>
  );
};
export default HomePage;
