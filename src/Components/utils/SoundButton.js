import classes from './SoundButton.module.css'

const SoundButton = ({onBtnClick, imageUrl}) => {

    const clickHandler = () => {
        onBtnClick()
    }

    return <div className={classes.button} onClick={clickHandler} style={{background: `url(${imageUrl}) no-repeat center center/cover`}}/>
}

export default SoundButton