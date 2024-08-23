import {RouterProvider} from "react-router-dom";
import MainRouter from "./main-router";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={MainRouter}/>
    </Provider>
  )
}

export default App