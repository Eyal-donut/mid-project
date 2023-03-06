import classes from "./FightingPokemon.module.css";

const Bar = ({label, value, maxValue }) => {
  return (
    <div className={classes.barWrapper}>
      <p>{label}</p>
      <div className={classes.barMax}>
        <div className={classes.barValue} style={{width: `${(value/maxValue)*100}%`}}></div>
      </div>
    </div>
  );
};

export default Bar;
