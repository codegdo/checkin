import React from 'react'
import ReactDOM from 'react-dom/client'

import './assets/css/main.scss'
import { App } from './app.component';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
