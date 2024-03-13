import { Box } from "@mui/material"
import Header2 from "./components/Header2"
import Sidebar2 from "./components/Sidebar2"
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom"
import RouteLayout from "./routes/RouteLayout"
import Email from "./components/Email"
import ViewEmail from "./components/ViewEmail"
function App() {

const routes= createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Navigate to={"/inbox"}/>}/>
    <Route path="/*" element={<Navigate to={"/inbox"}/>}/>

    <Route path="/inbox" element={<RouteLayout/>}>
      <Route index element={<Email/>}/>
      <Route path="view" element={<ViewEmail/>}/>
    </Route>
    </>
  )
)
  
  return (
    <RouterProvider router={routes}/>
  )
}

export default App
