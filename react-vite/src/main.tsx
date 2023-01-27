import React from 'react'
import ReactDOM from 'react-dom/client'

import './assets/css/index.scss'
import { App } from './app.component';
//import App from './App'
//import './index.css';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
