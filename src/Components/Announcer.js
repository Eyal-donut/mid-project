import { useTypedMessage } from '../hooks/useTypedMessage/useTypedMessage'
import classes from './Announcer.module.css'

const Announcer = ({message, className}) => {
    const typedMessage = useTypedMessage(message)
    return <div className={`${classes.announcer} ${className}`}>{typedMessage}</div>
    
}

export default Announcer