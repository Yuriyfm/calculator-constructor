import React from "react";
import Eye from "../modeButtonsIcons/Eye";
import "../modeButtonsStyle.scss";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import EyeActive from "../modeButtonsIcons/EyeActive";

const RuntimeButton = ({ modeButtonClickHandler }) => {
  const mode = useTypedSelector((state) => state.calculatorReducer.mode);
  return (
    <div
      className={
        mode === "runtime"
          ? "mode-button-runtime-active"
          : "mode-button-runtime"
      }
      onClick={() => modeButtonClickHandler("runtime")}
    >
      {mode === "runtime" ? <EyeActive /> : <Eye />}
      <span className={"mode-buttons-text"}>Runtime</span>
    </div>
  );
};

export default RuntimeButton;
