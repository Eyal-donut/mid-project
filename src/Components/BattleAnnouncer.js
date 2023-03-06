import classes from '../pages/BattlePage.module.css'
import { useTypedMessage } from '../hooks/useTypedMessage/useTypedMessage'

const BattleAnnouncer = ({message}) => {
    const typedMessage = useTypedMessage(message)
    return <div className={classes.announcer}>{typedMessage}</div>
    
}

export default BattleAnnouncer