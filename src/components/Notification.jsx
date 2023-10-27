import { useReducer, createContext } from 'react'
import { useNotification } from '../contexts/NotificationContext'

const Notification = () => {
  const [notification, dispatch] = useNotification()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  if (notification && notification.message) {
    const { message, timeout } = notification
    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, timeout)

    return <div style={style}>{message}</div>
  }

  return null
}

export default Notification
