import classes from "./PokemonCard.module.css";

const PokemonCard = ({ imageUrl, name, level, strength, defense, attackOne, attackTwo }) => {
  return (
    <div className={classes.wrapper}>
      <div
        style={{ background: `url(${imageUrl}) no-repeat center center/cover` }}
        className={classes.imageUrl}
      ></div>
      <ul>
        <li>Name: {name}</li>
        <li>Level: {level}</li>
        <li>Strength: {strength}</li>
        <li>Defense: {defense}</li>
        <li>Attacks: {`${attackOne}, ${attackTwo}`}</li>
      </ul>
    </div>
  );
};

export default PokemonCard
