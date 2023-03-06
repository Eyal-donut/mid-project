import FightingPokemon from "./FightingPokemon"
import classes from './FightingPokemon.module.css'


const PlayerFighter = ({imageUrl, value, maxValue, name}) => {

    return <FightingPokemon className={classes.player} imageUrl={imageUrl} name={name} infoClassName={classes.playerInfo} value={value} maxValue={maxValue}/>
}
export default PlayerFighter    