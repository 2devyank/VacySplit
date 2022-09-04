import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { UserAuthContextProvider } from './context/UserAuthContext'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserAuthContextProvider>

    <App />
    </UserAuthContextProvider>
  </React.StrictMode>
)
