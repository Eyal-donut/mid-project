import { useCurrentPokemonContext } from "../../context/CurrentPokemonContext";
import { usePokedexContext } from "../../context/PokedexContext";
import classes from "./PokedexModal.module.css";
import PokedexNestedWindow from './PokedexNestedWindow'

const PokedexModal = ({children}) => {
  const {setPokedexDisplay} = usePokedexContext()
  const {setIsChoosePokemon} = useCurrentPokemonContext()


  const clickHandler = (e) => {
    if (e.target.id === 'screen-cover') {
      setPokedexDisplay(false)
      setIsChoosePokemon(false)
    }
  }

  return (
    <>
      <div id='screen-cover' className={classes.screenCover} onClick={clickHandler}>
        <PokedexNestedWindow>
        {children}
        </PokedexNestedWindow>
      </div>
    </>
  );
};
export default PokedexModal;
