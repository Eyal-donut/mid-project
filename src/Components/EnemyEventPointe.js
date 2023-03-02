import classes from "./EnemyEventPointe.module.css";

const EnemyEventPointer = ({ className }) => {
  return (
    <>
      <div className={`${classes.enemyEvent} ${className}`}></div>
    </>
  );
};

export default EnemyEventPointer