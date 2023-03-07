import { useBattleContext } from "../context/BattleContext"
import FightingPokemon from "./FightingPokemon"
import classes from './FightingPokemon.module.css'


const EnemyFighter = ({imageUrl, value, maxValue, name, className, level}) => {
    const { isBattleStarted } = useBattleContext()

    return <FightingPokemon className={isBattleStarted ? `${classes.enemy} ${className}` :`${classes.enemyBeforeStart} ${className}` } imageUrl={imageUrl} name={name} value={value} maxValue={maxValue} level={level}/>
}

export default EnemyFighter