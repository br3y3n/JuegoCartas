import { BrowserRouter, useRoutes } from "react-router-dom"
import { LoginRegister } from "./Pages/LoginRegister"
import { CrearPartida } from "./Pages/CrearPartida"
import { PreSala } from "./Pages/PreSala"
import { Sala } from "./Pages/Sala"


function App() {

  const AppRouter = () => {
    const routes = useRoutes([
      { path: '/', element: <LoginRegister /> },
      { path: '/crearPartida', element: <CrearPartida /> },
      { path: '/presala/:id', element: <PreSala /> },
      { path: '/sala/:id', element: <Sala /> },

    ])
    return routes
  }
  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  )
}

export default App
