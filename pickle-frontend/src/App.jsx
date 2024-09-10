import {RouterProvider} from "react-router-dom";
import MainRouter from "./main-router";
import { Provider } from "react-redux";
import store from "./store";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/custom-bootstrap.css';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>        
        <RouterProvider router={MainRouter}/>
      </ThemeProvider>
    </Provider>
  )
}

export default App