import classes from "./Pokedex.module.css";
import { useState } from "react";

const Pokedex = () => {
  const [showedPokemon, setShowedPokemon] = useState(
    "start it with your current pokemon"
  );

  console.log(showedPokemon);
  console.log(setShowedPokemon);
  //create a global Pokedex context containing: the isPokedexUpdated state, pokedexShownPokemons state, userPokemons state, isPokedexDisplay state
  return (
    <>
      {/* {isPokedexDisplay && ....} */}
      <div className={classes.wrapper}>
        <div className={classes.pokedex}>
          <div className={classes.showedPokemon}></div>
        </div>
      </div>
      {/* {!isPokedexDisplay && ...} */}
        <div className={classes.updateActive} />
        {/* update active is an arrow going up and down when there's an update in the pokedex. */}
        
    </>
  );
};

export default Pokedex;
