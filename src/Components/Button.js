const Button = ({text, id, onBtnClick, className}) => {
    
    const clickHandler = (e) => {
        onBtnClick(e.target.id)
    }

    return <button onClick={clickHandler} id={id} className={className}>{text}</button>
}

export default Button