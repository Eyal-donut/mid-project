import NestedWindow from "./utils/NestedWindow";
import classes from "../pages/HomePage.module.css";



const ChoosePokemonWindow = ({ onPokemonClick }) => {
  const clickHandler = (e) => {
    if (e.target.id === "one") {
    }
    if (e.target.id === "two") {
    }
    if (e.target.id === "three") {
    }
    onPokemonClick(e.target.id);
  };

  return (
    <>
      <NestedWindow>
        <h1 className={classes.h1}>Choose your starting Pokémon</h1>
        <div className={classes.wrapper}>
          <div
            id="two"
            className={`${classes.pokemonImg} ${classes.two}`}
            onClick={clickHandler}
          />
            <audio src="../assets/Audio/3.mp3" id="squirtleSound"></audio>;

          <div
          
            id="one"
            className={`${classes.pokemonImg} ${classes.one}`}
            onClick={clickHandler}
          />
          <div
            id="three"
            className={`${classes.pokemonImg} ${classes.three}`}
            onClick={clickHandler}
          />
        </div>

        <button id="back-btn" className={classes.button} onClick={clickHandler}>
          Back
        </button>
      </NestedWindow>
    </>
  );
};

export default ChoosePokemonWindow;
