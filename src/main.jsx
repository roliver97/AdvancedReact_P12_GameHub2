import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GameProvider } from './context/GameContext.jsx'
import { UserProvider } from './context/UserContext.jsx'

createRoot(document.getElementById('app')).render(
  <StrictMode>
    <BrowserRouter basename='/'>
      <UserProvider>
        <GameProvider>
          <App />
        </GameProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
)

//! En este caso <App/> actua como la prop {children} que espera tanto UserProvider como GameProvider. Al tratarse de children, significa que la referencia de App ha sido creada fuera de los componentes <UserProvider> y <GameProvider> (es decir, ha sido creada dentro de main.js), por lo que la renderización de estos no provocará la re-renderización de <App/>. Y eso se aplica a cualquier componente que anidemos dentro de los Provider (o cualquiera que use {children}). Lo único que provocará una re-renderización de un componente originada por un Provider será si dicho componente usa el hook useUserContext() o useGameContext().
