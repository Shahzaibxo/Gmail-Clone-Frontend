import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom"
import RouteLayout from "./routes/RouteLayout"
import Emails from "./components/Emails.jsx"
import ViewEmail from "./components/ViewEmail"
import Signup from "./components/Landing.jsx"
import Login from "./components/Login.jsx"

function App() {
  
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Root Route */}

        <Route path="/registration">
        <Route path="/registration/signup" element={<Signup/>} />
        <Route path="/registration/login" element={<Login/>} />
        </Route>


        {/* Inbox Route */}
        <Route path="/emails/:param" element={<RouteLayout />}>
          <Route index element={<Emails />} />

          {/* Sub Route */}
          <Route path="view" element={<ViewEmail />} />
        </Route>

        {/* Invalid reroute */}
        <Route path="*" element={<Navigate to="/registration/signup" />} />
      </>
    )
  )
  
  return (
    <RouterProvider router={routes} />
  )
}

export default App
