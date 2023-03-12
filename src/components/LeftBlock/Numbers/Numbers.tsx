import React from "react";
import "./numbersStyle.scss";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { setBuffer } from "../../../store/reducers/calculatorReducer";
import { calculatorNumberButtons } from "../../../types/calculatorReducerTypes";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const Numbers: React.FC = () => {
  const dispatch: Dispatch = useDispatch();
  const mode = useTypedSelector((state) => state.calculatorReducer.mode);
  let numbers: Array<Array<calculatorNumberButtons>> = [
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    ["0", ","],
  ];
  const numberButtonHandler = (number: calculatorNumberButtons) => {
    mode === "runtime" && dispatch(setBuffer(number));
  };
  return (
    <div className={"numbers-container"}>
      {numbers.map((numbersBlock, index) => (
        <div key={index} className={"numbers-block"}>
          {numbersBlock.map((number) =>
            number !== "0" ? (
              <div
                key={number}
                className={
                  mode !== "runtime" ? "number-button" : "number-button-active"
                }
                onClick={() => {
                  numberButtonHandler(number);
                }}
              >
                <span className={"button-text"}>{number}</span>
              </div>
            ) : (
              <div
                key={number}
                className={
                  mode !== "runtime"
                    ? "number-button-zero"
                    : "number-button-zero-active"
                }
                onClick={() => {
                  numberButtonHandler(number);
                }}
              >
                <span className={"button-text"}>{number}</span>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default Numbers;