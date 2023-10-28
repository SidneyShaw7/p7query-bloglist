import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { NotificationContextProvider } from './contexts/NotificationContext'
import { AuthContextProvider } from './contexts/AuthContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
)
