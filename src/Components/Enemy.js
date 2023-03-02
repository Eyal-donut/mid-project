import classes from './Enemy.module.css'

const Enemy = (onBtnClick, id, className) => {
    const clickHandler = (e) => {
        onBtnClick(e.target.id)
    }
    return (
        <>
            <div onClick={clickHandler} id={id} className={`${classes.enemyEvent} ${className}`}>

            </div>
        </>
    )
}

export default Enemy