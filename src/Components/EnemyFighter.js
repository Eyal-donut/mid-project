import FightingPokemon from "./FightingPokemon"
import classes from './FightingPokemon.module.css'

const EnemyFighter = ({imageUrl}) => {
    return <FightingPokemon className={classes.enemy} imageUrl={imageUrl}/>
}

export default EnemyFighter