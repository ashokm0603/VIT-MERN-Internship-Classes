import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Parent from './Parent.jsx'
import ExampleUseEffect from './ExampleUseEffect.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Parent/> */}
    {/* <ExampleUseEffect/> */}
  </StrictMode>,
)
