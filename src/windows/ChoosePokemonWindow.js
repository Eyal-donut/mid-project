import NestedWindow from "../Components/utils/NestedWindow";
import classes from "../pages/HomePage.module.css";

const ChoosePokemonWindow = ({ onPokemonClick }) => {

  const clickHandler = (e) => {
    onPokemonClick(e.target.id);
  };

  const handleMouseEnter = (e) => {
    e.target.classList.add("scaleAvatar");
  };

  const handleMouseLeave = (e) => {
    e.target.classList.remove("scaleAvatar");
  };

  return (
    <>
      <NestedWindow>
        <h2 className={classes.h1}>Choose your starting Pokémon</h2>
        <div className={classes.wrapper}>
          <div
            id="bulbasaur"
            className={`${classes.pokemonImg} ${classes.twentyFive}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={clickHandler}
          />
          <div
            id="pikachu"
            className={`${classes.pokemonImg} ${classes.twentyFour}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={clickHandler}
          />
          <div
            id="squirtle"
            className={`${classes.pokemonImg} ${classes.twentySix}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
