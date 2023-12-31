import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import CurrencyDataProvider from './Context/CurrencyDataContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
    <CurrencyDataProvider>
      <App />
    </CurrencyDataProvider>
  </React.StrictMode>
)
