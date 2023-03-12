import React from "react";
import "./mathsOperatorsStyle.scss";
import { operatorType } from "../../../types/calculatorReducerTypes";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import {
  changeOperator,
  setExpression,
  setOperator,
  setResult,
} from "../../../store/reducers/calculatorReducer";
import {
  operatorIsLastCharInExpression,
  isExpressionHasOperator,
} from "../../../helpers/helpersFunctions";

const MathsOperators: React.FC = () => {
  const dispatch: Dispatch = useDispatch();
  const mode = useTypedSelector((state) => state.calculatorReducer.mode);
  const buffer = useTypedSelector((state) => state.calculatorReducer.buffer);
  const expression = useTypedSelector(
    (state) => state.calculatorReducer.expression
  );
  let operators: Array<operatorType> = ["/", "*", "-", "+"];

  let mathOperatorButtonHandler = (item: operatorType) => {
    if (mode === "runtime") {
      dispatch(setOperator(item));
      if (!isExpressionHasOperator(operators, expression)) {
        dispatch(setExpression(buffer + item));
      } else {
        if (operatorIsLastCharInExpression(operators, expression) && !buffer) {
          dispatch(changeOperator(item));
          return;
        }
        if (buffer) {
          if (operatorIsLastCharInExpression(operators, expression)) {
            dispatch(setExpression(expression + buffer));
            dispatch(setResult());
          }
          return;
        }
        dispatch(setResult());
      }
    }
  };
  return (
    <div className={"maths-operators"}>
      {operators.map((item) => (
        <div
          key={item}
          className={
            mode === "runtime"
              ? "maths-operators-button-active"
              : "maths-operators-button"
          }
          onClick={() => mathOperatorButtonHandler(item)}
        >
          <span className={"button-text"}>{item}</span>
        </div>
      ))}
    </div>
  );
};
export default MathsOperators;
