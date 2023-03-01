import NestedWindow from "./utils/NestedWindow";
import classes from "../pages/HomePage.module.css";

const CreateUserWindow = ({ onBtnClick, onCreatedUser }) => {
  
  const clickHandler = (e) => {
    onBtnClick(e.target.id);
  };
  const formSubmitHandler = (e) => {
    console.log('form submit')
    e.preventDefault();
    /*on submit: 
    -run password validator. 
        If Valid:
        //create user and update API
        */
       onCreatedUser()
  };

  return (
    <>
      <NestedWindow>
        <h1 className={classes.h1}>Create User</h1>
        <form>
          <ul>
            <li>
              <label htmlFor="username">Username: </label>
              <input name="username" type="text" />
            </li>
            <li>
              <label htmlFor="password">Password: </label>
              <input name="password" type="password" />
            </li>
          </ul>
        </form>
        <div className={classes.buttonsWrap}>
          <button
            id="back-btn"
            className={classes.button}
            onClick={clickHandler}
          >
            Back
          </button>
          <button id="create-user"
          className={classes.button}
          onClick={formSubmitHandler}
          >
            Create user
          </button>
        </div>
      </NestedWindow>
    </>
  );
};

export default CreateUserWindow;
