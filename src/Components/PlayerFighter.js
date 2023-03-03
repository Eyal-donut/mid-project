import FightingPokemon from "./FightingPokemon"
import classes from './FightingPokemon.module.css'

const PlayerFighter = ({imageUrl}) => {
    return <FightingPokemon className={classes.player} imageUrl={imageUrl}/>
}
export default PlayerFighter    