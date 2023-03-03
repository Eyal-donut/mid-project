import classes from './FightingPokemon.module.css'

const FightingPokemon = ({imageUrl, className}) => {
    return <div 
    className={`${classes.fightingPokemon} ${className}`}
    style={{
          background: `url(${imageUrl}) no-repeat center center/cover`,
        }}
    ></div>
}
export default FightingPokemon