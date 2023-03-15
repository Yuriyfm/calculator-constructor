import React from "react";
import "./equalStyle.scss";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import {
  setExpression, setMode,
  setResult,
} from "../../../store/reducers/calculatorReducer";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const Equal: React.FC = () => {
  const dispatch: Dispatch = useDispatch();
  const mode = useTypedSelector((state) => state.calculatorReducer.mode);
  const expression = useTypedSelector(
    (state) => state.calculatorReducer.expression
  );
  const buffer = useTypedSelector((state) => state.calculatorReducer.buffer);
  const result = useTypedSelector((state) => state.calculatorReducer.result);
  const lastNumber = useTypedSelector(
    (state) => state.calculatorReducer.lastNumber
  );
  function equalButtonHandler() {
    if (mode === "runtime") {
     if (result === 'Не определено') {
       dispatch(setMode('runtime'))
       return
     }
      if (buffer) {
        dispatch(setExpression(expression + buffer));
        dispatch(setResult());
      } else {
        dispatch(setExpression(expression + lastNumber));
        dispatch(setResult());
      }
    }
  }

  return (
    <div className={"equal-container"}>
      <div
        className={mode === "runtime" ? "equal-button-active" : "equal-button"}
        onClick={() => equalButtonHandler()}
      >
        <span className={"equal-button-text"}>=</span>
      </div>
    </div>
  );
};

export default Equal;
