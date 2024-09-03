import { combineReducers } from "redux";
import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import inputReducer from './reducers/input';
import pbReducer from "./reducers/pbslice"

export const rootReducer = combineReducers({
    user: userReducer,
    input: inputReducer,
    pb: pbReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        const middlewares = getDefaultMiddleware();
        // middlewares.push(myMiddleware); //커스텀 미들웨어 적용 시
        return middlewares;
      },
});

export default store;