import classes from "./PokedexNestedWindow.module.css";

const PokedexNestedWindow = ({children}) => {
  return (
      <div className={classes.wrapper}>
        {children}
      </div>
  );
};
export default PokedexNestedWindow;
