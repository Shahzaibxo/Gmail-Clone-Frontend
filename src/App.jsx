import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom"
import RouteLayout from "./routes/RouteLayout"
import Emails from "./components/Emails.jsx"
import ViewEmail from "./components/ViewEmail"

function App() {

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
      {/* Root Route */}
        
        <Route path="/" element={<Navigate to={"/emails/inbox"} />} />
      
      {/* Inbox Route */}
        <Route path="/emails/:param" element={<RouteLayout />}>
          <Route index element={<Emails />} />
        
          {/* Sub Route */}
          <Route path="view" element={<ViewEmail />} />
        </Route>

      {/* Safety Route */}
        <Route path="*" element={<Navigate to="/emails/inbox" />} />
      </>
    )
  )

  return (
    <RouterProvider router={routes} />
  )
}

export default App
