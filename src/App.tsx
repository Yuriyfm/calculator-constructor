import React, { useState } from "react";
import "./App.scss";
import Display from "./components/LeftBlock/Display/Display";
import MathsOperators from "./components/LeftBlock/MathsOperators/MathsOperators";
import Numbers from "./components/LeftBlock/Numbers/Numbers";
import Equal from "./components/LeftBlock/Equal/Equal";
import ModeButtons from "./components/RightBlock/ModeButtons/ModeButtons";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { constructorElement } from "./types/constructorReducerTypes";
import { useDispatch } from "react-redux";
import {
  removeElementFromRightBlock,
  setElementToRightBlock,
  sortElementsInRightBlock,
} from "./store/reducers/constructorReducer";
import { Dispatch } from "redux";
import DropzoneText from "./components/RightBlock/DropzoneText/DropzoneText";

function App() {
  const dispatch: Dispatch = useDispatch();
  const rightBlockElements = useTypedSelector(
    (state) => state.constructorReducer.rightBlockElements
  );
  const leftBlockElements = useTypedSelector(
    (state) => state.constructorReducer.leftBlockElements
  );
  const mode = useTypedSelector((state) => state.calculatorReducer.mode);
  const [currentDragElement, setCurrentDragElement] =
    useState<constructorElement>(null);

  const constructorComponentsList = {
    display: <Display />,
    mathsOperators: <MathsOperators />,
    numbers: <Numbers />,
    equal: <Equal />,
  };

  function dragStartHandler(
    event: React.DragEvent<HTMLDivElement>,
    item: constructorElement
  ): void {
    setCurrentDragElement(item);
  }

  function dragEndHandler(event: React.DragEvent<HTMLDivElement>): void {
    event.currentTarget.style.borderTop = "none";
  }

  function dragOverHandler(
    event: React.DragEvent<HTMLDivElement>,
  ): void {
    event.preventDefault();
    if (event.currentTarget.className === "right-block-item") {
      event.currentTarget.style.borderTop = "solid 2px #5D5FEF";
    }
  }

  function dragLeaveHandler(event: React.DragEvent<HTMLDivElement>) {
    if (event.currentTarget.className === "right-block-item") {
      event.currentTarget.style.borderTop = "none";
    }
  }

  function dropHandler(
    event: React.DragEvent<HTMLDivElement>,
    item?: constructorElement
  ): void {
    if (event.currentTarget.className === "right-block-item") {
      event.currentTarget.style.borderTop = "none";
    }
    if (mode !== "runtime") {
      !rightBlockElements.includes(currentDragElement)
        ? dispatch(setElementToRightBlock(currentDragElement))
        : item && dispatch(sortElementsInRightBlock(currentDragElement, item));
    }
  }

  function doubleClickHandler(item: constructorElement) {
    mode !== "runtime" && dispatch(removeElementFromRightBlock(item));
  }

  return (
    <div className="app">
      <div className={"main-container"}>
        {mode === "runtime" ? (
          <div className={"left-block"}></div>
        ) : (
          <div className={"left-block"}>
            {leftBlockElements.map((item: constructorElement, i) => (
              <div
                key={item}
                className={
                  rightBlockElements.includes(item)
                    ? "left-block-item-disabled"
                    : "left-block-item"
                }
              >
                <div
                  draggable={
                    !rightBlockElements.includes(item) && mode === "constructor"
                  }
                  aria-disabled={rightBlockElements.includes(item)}
                  onDragStart={(event) => dragStartHandler(event, item)}
                  onDragEnd={(event) => dragEndHandler(event)}
                  onDragOver={(event) => dragOverHandler(event)}
                  onDragLeave={(event) => dragLeaveHandler(event)}
                  onDrop={(event) => dropHandler(event, item)}
                >
                  {item && constructorComponentsList[item]}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className={"right-block"}>
          <ModeButtons />
          <div
            className={
              !rightBlockElements.length ? "dropzone-empty" : "dropzone"
            }
            onDragOver={(event) => dragOverHandler(event)}
            onDrop={(event) => dropHandler(event)}
          >
            {rightBlockElements.length === 0 ? (
              <DropzoneText />
            ) : (
              rightBlockElements.map((item: constructorElement, i) => (
                <div
                  key={item}
                  className={`right-block-item`}
                  draggable={mode === "constructor" && item !== "display"}
                  onDoubleClick={() => doubleClickHandler(item)}
                  onDragStart={(event) => dragStartHandler(event, item)}
                  onDragEnd={(event) => dragEndHandler(event)}
                  onDragOver={(event) => dragOverHandler(event)}
                  onDragLeave={(event) => dragLeaveHandler(event)}
                  onDrop={(event) => dropHandler(event, item)}
                >
                  {item && constructorComponentsList[item]}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
