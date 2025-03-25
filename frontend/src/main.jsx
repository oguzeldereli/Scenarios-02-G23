import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { I18nProvider } from 'react-aria-components'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nProvider locale="en-US">
      <App />
    </I18nProvider>
  </StrictMode>,
)
