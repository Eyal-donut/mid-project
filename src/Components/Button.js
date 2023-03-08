const Button = ({text, id, className, onBtnClick}) => {
    
    const clickHandler = () => {
        onBtnClick()
    }

    return <button onClick={clickHandler} id={id} className={className}>{text}</button>
}

export default Button