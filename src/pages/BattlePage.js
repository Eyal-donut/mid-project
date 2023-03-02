import { Link } from "react-router-dom";
import { useLocationContext } from "../context/CurrentLocationContext";
import {useEffect} from 'react'

import classes from './BattlePage.module.css'
import Pokedex from "../Components/Pokedex";

const BattlePage = () => {
  const {currentLocation} = useLocationContext()

  useEffect(() => {
    //pokedex
    
  }, []);




  return (
    <>
    <Pokedex/>
    <main
        className={classes.main}
        style={{
          background: `url(${currentLocation.imageUrl}) no-repeat center center/cover`,
        }}
      >
      <h1>LET'S GOOOO, fight page</h1>
      <Link to=".." relative="path"><button>back</button></Link>
      <Link to="/map"><button>Game map</button></Link>

      </main>



    </>
  );
};

export default BattlePage
