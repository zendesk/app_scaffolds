import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ClientProvider } from './contexts/ClientProvider.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ClientProvider>
    <App />
  </ClientProvider>
)
