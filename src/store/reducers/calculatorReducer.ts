import {
  calculatorAction,
  calculatorActionTypes,
  calculatorNumberButtons,
  initialStateI,
  modeType,
  operatorType,
} from "../../types/calculatorReducerTypes";
import {
  calcOperation,
  formatResult,
  parseExpression,
} from "../../helpers/helpersFunctions";

const initialState: initialStateI = {
  operator: "none",
  result: "0",
  buffer: "",
  expression: "",
  lastNumber: "",
  mode: "constructor",
};

export const calculatorReducer = (
  state = initialState,
  action: calculatorAction
): initialStateI => {
  switch (action.type) {
    case calculatorActionTypes.SET_MODE: {
      return {
        ...state,
        mode: action.payload,
        operator: "none",
        result: "0",
        buffer: "",
        expression: "",
        lastNumber: "",
      };
    }
    case calculatorActionTypes.SET_OPERATOR: {
      return {
        ...state,
        operator: action.payload,
      };
    }
    case calculatorActionTypes.CHANGE_OPERATOR: {
      return {
        ...state,
        expression: state.expression.slice(0, -1) + action.payload,
      };
    }
    case calculatorActionTypes.SET_BUFFER: {
      if (action.payload === ",") {
        if (state.result && !state.buffer) {
          return { ...state, buffer: "0." };
        } else {
          return { ...state, buffer: state.buffer + "." };
        }
      } else {
        return { ...state, buffer: state.buffer + action.payload };
      }
    }
    case calculatorActionTypes.SET_EXPRESSION: {
      return { ...state, expression: action.payload, buffer: "" };
    }
    case calculatorActionTypes.SET_RESULT: {
      let expression = state.expression;
      let operator = state.operator;
      let { firstNum, secondNum, exprOperator } = parseExpression(
        expression,
        state.result
      );
      let result: string = String(
        calcOperation(exprOperator, firstNum, secondNum)
      );
      result = formatResult(result);
      return {
        ...state,
        result: result,
        lastNumber: String(secondNum),
        expression: String(result) + operator,
      };
    }
    default:
      return state;
  }
};

//action creators
export const setBuffer = (payload: calculatorNumberButtons | operatorType) => ({
  type: calculatorActionTypes.SET_BUFFER,
  payload,
});
export const setMode = (payload: modeType) => ({
  type: calculatorActionTypes.SET_MODE,
  payload,
});
export const setOperator = (payload: operatorType) => ({
  type: calculatorActionTypes.SET_OPERATOR,
  payload,
});
export const changeOperator = (payload: operatorType) => ({
  type: calculatorActionTypes.CHANGE_OPERATOR,
  payload,
});
export const setExpression = (payload: string) => ({
  type: calculatorActionTypes.SET_EXPRESSION,
  payload,
});
export const setResult = () => ({ type: calculatorActionTypes.SET_RESULT });
