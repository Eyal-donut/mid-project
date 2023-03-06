import classes from "./FightingPokemon.module.css";
import Bar from "./Bar";

const FighterInfo = ({ name, infoClassName, value, maxValue, level }) => {
  return (
    <>
      <div className={`${classes.infoWrapper} ${infoClassName}`}>
        <div className={classes.nameWrapper}>
          <div>{name}</div>
          <div>Lvl: {level}</div>
        </div>
        <Bar label="HP" value={value} maxValue={maxValue} />
      </div>
    </>
  );
};

export default FighterInfo;
