import {RouterProvider} from "react-router-dom";
import MainRouter from "./main-router";

function App() {
  return (
    <RouterProvider router={MainRouter}/>
  )
}

export default App