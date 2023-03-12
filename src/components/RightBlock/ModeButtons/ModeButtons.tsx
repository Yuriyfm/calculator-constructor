import React from "react";
import "./modeButtonsStyle.scss";
import RuntimeButton from "./Buttons/RuntimeButton";
import ConstructorButton from "./Buttons/ConstructorButton";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { setMode } from "../../../store/reducers/calculatorReducer";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { modeType } from "../../../types/calculatorReducerTypes";

const ModeButtons: React.FC = () => {
  const dispatch: Dispatch = useDispatch();
  const mode = useTypedSelector((state) => state.calculatorReducer.mode);
  const modeButtonClickHandler = (buttonType: modeType): void => {
    buttonType !== mode && dispatch(setMode(buttonType));
  };

  return (
    <div className={"mode-buttons-container"}>
      <RuntimeButton modeButtonClickHandler={modeButtonClickHandler} />
      <ConstructorButton modeButtonClickHandler={modeButtonClickHandler} />
    </div>
  );
};

export default ModeButtons;
