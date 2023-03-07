import classes from "./PokedexModal.module.css";
import PokedexNestedWindow from './PokedexNestedWindow'

const PokedexModal = ({children}) => {
  return (
    <>
      <div className={classes.screenCover}>
        <PokedexNestedWindow>
        {children}
        </PokedexNestedWindow>
      </div>
    </>
  );
};
export default PokedexModal;
