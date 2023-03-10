import FightingPokemon from "./FightingPokemon"
import classes from './FightingPokemon.module.css'


const PlayerFighter = ({level, imageUrl, value, maxValue, name, className}) => {

    return <FightingPokemon className={`${classes.player} ${className}`} imageUrl={imageUrl} name={name} infoClassName={classes.playerInfo} value={value} maxValue={maxValue} level={level}/>
}
export default PlayerFighter    