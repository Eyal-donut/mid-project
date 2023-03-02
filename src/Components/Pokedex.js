import classes from "./Pokedex.module.css";
import { useState } from "react";
import Modal from "./utils/Modal";

const Pokedex = () => {
  const [showedPokemon, setShowedPokemon] = useState(
    "start it with your current pokemon"
  );

  //just to restart the update active and display states, to do a draft:
  const [isPokedexUpdated, setPokedexUpdated] = useState(true);
  const [isPokedexDisplay, setPokedexDisplay] = useState(false);

  console.log(showedPokemon);
  console.log(setShowedPokemon);

  const clickHandler = () => {
    setPokedexUpdated(false);
  };
  //create a global Pokedex context containing: the isPokedexUpdated state, pokedexShownPokemons state, userPokemons state, isPokedexDisplay state
  return (
    <>
      {isPokedexDisplay && (
        <Modal>
          <div className={classes.pokedex}>
            <div className={classes.showedPokemon}></div>
          </div>
        </Modal>
      )}
      <div className={classes.pokedexLogoWrapper}>
        {/* update active is an arrow going up and down when there's an update in the pokedex. */}
        <div className={classes.pokedexLogo} onClick={clickHandler}>
          {isPokedexUpdated && (
            <div className={classes.updateLogo}>
                <div className={classes.exclamationMark}/>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Pokedex;
