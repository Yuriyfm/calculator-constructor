import { operatorType } from "../types/calculatorReducerTypes";

export const isExpressionHasOperator = (
  operators: Array<operatorType>,
  expression: string
) => {
  return operators.find((item) => expression.includes(item)) || false;
};

export const operatorIsLastCharInExpression = (
  operators: Array<operatorType>,
  expression: string
) => {
  return operators.find((item) => item === expression.slice(-1)) || false;
};

export const parseExpression = (expression: string, result: string) => {
  let operators: Array<operatorType> = ["/", "*", "-", "+"];
  let operator: operatorType =
    operators.find((operator) => expression.includes(operator)) || "none";
  let numbers = expression.split(operator);
  let firstNum = numbers[0] ? +numbers[0] : +result;
  let secondNum = +numbers[1];
  return { firstNum, secondNum, exprOperator: operator };
};

export const calcOperation = (
  operator: operatorType,
  firstNum: number,
  secondNum: number
): number => {
  let result = 0;
  switch (operator) {
    case "/":
      result = firstNum / secondNum;
      break;
    case "*":
      result = firstNum * secondNum;
      break;
    case "-":
      result = firstNum - secondNum;
      break;
    case "+":
      result = firstNum + secondNum;
      break;
  }
  return result;
};

export const formatResult = (result: string) => {
  let formattingResult = result;
  formattingResult.replace(".", ",");
  if (formattingResult.length > 17 && formattingResult.indexOf(","))
    result = result.slice(0, 17);
  if (formattingResult === "Infinity") formattingResult = "Не определено";
  return formattingResult;
};

export const checkDisplayStyle = (result: string) => {
  if (result.length <= 8) {
    return "display-text";
  }
  if (result.length > 8 && result.length <= 17) {
    return "display-small-text";
  }
  if (result.length > 17) {
    return "display-extra-small-text";
  }
  return "display-text";
};
