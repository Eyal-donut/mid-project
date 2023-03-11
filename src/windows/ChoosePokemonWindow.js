import NestedWindow from "../Components/utils/NestedWindow";
import classes from "../pages/HomePage.module.css";
import useSound from "use-sound";
import choosePokemonSounds from "../assets/Audio/choosePokemonSounds.mp3";

const ChoosePokemonWindow = ({ onPokemonClick }) => {

  const [playSound, { stop }] = useSound(choosePokemonSounds, {
    sprite: {
      bulbasaur: [4, 779],
      squirtle: [1853, 2543],
      pikachu: [850, 1004],
    },
    volume: 0.3,
  });

  const clickHandler = (e) => {
    onPokemonClick(e.target.id);
  };

  const handleMouseEnter = (e) => {
    e.target.classList.add("scaleAvatar");

    if (e.target.id === "pikachu") {
      playSound({ id: "pikachu" });
    }
    if (e.target.id === "bulbasaur") {
      playSound({ id: "bulbasaur" });
    }
    if (e.target.id === "squirtle") {
      playSound({ id: "squirtle" });
    }
  };

  const handleMouseLeave = (e) => {
    stop();
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
