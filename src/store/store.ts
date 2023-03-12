import { combineReducers, createStore } from "redux";
import { calculatorReducer } from "./reducers/calculatorReducer";
import { constructorReducer } from "./reducers/constructorReducer";

export const appReducer = combineReducers({
  calculatorReducer: calculatorReducer,
  constructorReducer: constructorReducer,
});

let store = createStore(appReducer);
export default store;

export type appReducerType = ReturnType<typeof appReducer>;


