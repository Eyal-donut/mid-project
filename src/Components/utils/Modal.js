import classes from "./Modal.module.css";
import PokedexNestedWindow from './PokedexNestedWindow'

const Modal = ({children}) => {
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
export default Modal;
