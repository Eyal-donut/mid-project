import FightingPokemon from "./FightingPokemon"
import classes from './FightingPokemon.module.css'


const EnemyFighter = ({imageUrl, value, maxValue, name, className, level}) => {

    return <FightingPokemon className={`${classes.enemy} ${className}`} imageUrl={imageUrl} name={name} value={value} maxValue={maxValue} level={level}/>
}

export default EnemyFighter