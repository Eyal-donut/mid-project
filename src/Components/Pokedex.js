import classes from "./Pokedex.module.css";
import { useState } from "react";
import PokedexModal from "./utils/PokedexModal";

const Pokedex = () => {
  

  //just to restart the update active and display states, to do a draft:
  const [isPokedexUpdated, setPokedexUpdated] = useState(true);
  const [isPokedexDisplay, setPokedexDisplay] = useState(true);

  const clickHandler = () => {
    setPokedexUpdated(false);
  };
  //create a global Pokedex context containing: the isPokedexUpdated state, pokedexShownPokemons state, userPokemons state, isPokedexDisplay state
  return (
    <>
      {isPokedexDisplay && (
        <PokedexModal>
          <div className={classes.pokedex}>
            <div className={classes.showedPokemon}></div>
          </div>
        </PokedexModal>
      )}
      {!isPokedexDisplay && (
        <div className={classes.pokedexLogoWrapper}>
          {/* update active is an arrow going up and down when there's an update in the pokedex. */}
          <div className={classes.pokedexLogo} onClick={clickHandler}>
            {isPokedexUpdated && (
              <div className={classes.updateLogo}>
                <div className={classes.exclamationMark} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Pokedex;
