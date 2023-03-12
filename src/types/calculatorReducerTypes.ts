export type operatorType = "none" | "/" | "*" | "+" | "-" | "=";
export type modeType = "constructor" | "runtime";
export type calculatorNumberButtons =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "0"
  | ",";

export interface initialStateI {
  operator: operatorType;
  buffer: string;
  result: string;
  lastNumber: string;
  expression: string;
  mode: modeType;
}

export enum calculatorActionTypes {
  SET_MODE = "SET_MODE",
  SET_RESULT = "SET_RESULT",
  SET_BUFFER = "SET_BUFFER",
  SET_OPERATOR = "SET_OPERATOR",
  CHANGE_OPERATOR = "CHANGE_OPERATOR",
  SET_EXPRESSION = "SET_EXPRESSION",
}

export interface setMode {
  type: calculatorActionTypes.SET_MODE;
  payload: "constructor" | "runtime";
}

export interface changeOperator {
  type: calculatorActionTypes.CHANGE_OPERATOR;
  payload: operatorType;
}

export interface setOperator {
  type: calculatorActionTypes.SET_OPERATOR;
  payload: operatorType;
}

export interface setResult {
  type: calculatorActionTypes.SET_RESULT;
}

export interface setBuffer {
  type: calculatorActionTypes.SET_BUFFER;
  payload: calculatorNumberButtons | operatorType | string;
}

export interface setExpression {
  type: calculatorActionTypes.SET_EXPRESSION;
  payload: string;
}

export type calculatorAction =
  | setMode
  | setResult
  | setBuffer
  | setOperator
  | changeOperator
  | setExpression;
