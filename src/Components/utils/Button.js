const Button = ({ text, id, className, onBtnClick, disabled }) => {
  const clickHandler = () => {
    onBtnClick();
  };

  return (
    <button
      onClick={clickHandler}
      id={id}
      className={className}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
