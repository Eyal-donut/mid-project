import classes from "./Modal.module.css";
import NestedWindow from "./NestedWindow";

const Modal = ({children}) => {
  return (
    <>
      <div className={classes.screenCover}>
        <NestedWindow>
        {children}
        </NestedWindow>
      </div>
    </>
  );
};
export default Modal;
