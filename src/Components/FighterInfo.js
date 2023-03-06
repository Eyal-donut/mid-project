import classes from "./FightingPokemon.module.css";
import Bar from "./Bar";

const FighterInfo = ({ name, infoClassName, value, maxValue }) => {
  return (
    <>
      <div className={`${classes.infoWrapper} ${infoClassName}`}>
        <div>{name}</div>
        <Bar label='HP' value={value} maxValue={maxValue}/>
      </div>
    </>
  );
};

export default FighterInfo