import FightingPokemon from "./FightingPokemon"
import classes from './FightingPokemon.module.css'


const EnemyFighter = ({imageUrl, value, maxValue, name}) => {

    return <FightingPokemon className={classes.enemy} imageUrl={imageUrl} name={name} value={value} maxValue={maxValue}/>
}

export default EnemyFighter