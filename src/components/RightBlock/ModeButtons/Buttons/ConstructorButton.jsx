import React from "react";
import Selector from "../modeButtonsIcons/Selector";
import "../modeButtonsStyle.scss";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import SelectorActive from "../modeButtonsIcons/SelectorActive";

const ConstructorButton = ({ modeButtonClickHandler }) => {
  const mode = useTypedSelector((state) => state.calculatorReducer.mode);
  return (
    <div
      className={
        mode === "constructor"
          ? "mode-button-constructor-active"
          : "mode-button-constructor"
      }
      onClick={() => modeButtonClickHandler("constructor")}
    >
      {mode === "constructor" ? <SelectorActive /> : <Selector />}
      <span className={"mode-buttons-text"}>Constructor</span>
    </div>
  );
};

export default ConstructorButton;
