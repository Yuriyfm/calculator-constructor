import React from "react";
import "./displayStyle.scss";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { checkDisplayStyle } from "../../../helpers/helpersFunctions";

const Display: React.FC = () => {
  const result = useTypedSelector((state) => state.calculatorReducer.result);

  return (
    <div className={"display-container"}>
      <div className={"display"}>
        <span className={checkDisplayStyle(result)}>{result}</span>
      </div>
    </div>
  );
};
export default Display;