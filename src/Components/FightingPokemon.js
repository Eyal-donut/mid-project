import FighterInfo from "./FighterInfo";
import classes from "./FightingPokemon.module.css";

const FightingPokemon = ({ imageUrl, className, name, infoClassName, value, maxValue }) => {
  return (
    <>
      <div className={`${classes.pokemonAndInfoWrap} ${className}`}>
        <FighterInfo name={name} infoClassName={infoClassName} value={value} maxValue={maxValue} />
        <div
          className={classes.fightingPokemon}
          style={{
            background: `url(${imageUrl}) no-repeat center center/cover`,
          }}
        ></div>
      </div>
    </>
  );
};
export default FightingPokemon;
