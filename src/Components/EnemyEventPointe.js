import classes from "./EnemyEventPointe.module.css";

const EnemyEventPointer = ({ className, onBtnClick, id }) => {
  const clickHandler = (e) => {
    console.log(e.target.id)
    onBtnClick(e.target.id)
  }
  return (
    <>
      <div className={`${classes.enemyEvent} ${className}`} onClick={clickHandler} id={id}></div>
    </>
  );
};

export default EnemyEventPointer