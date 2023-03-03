import classes from "./EnemyEventPointe.module.css";

const EnemyEventPointer = ({ className, onBtnClick, identifier }) => {
  const clickHandler = (e) => {
    onBtnClick(e.target.id)
  }
  return (
    <>
      <div className={`${classes.enemyEvent} ${className}`} onClick={clickHandler} id={identifier}></div>
    </>
  );
};

export default EnemyEventPointer