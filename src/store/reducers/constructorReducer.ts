import {
  constructorElement,
  constructorReducerAction,
  constructorReducerActionTypes,
  ConstructorReducerInitialState,
} from "../../types/constructorReducerTypes";

const initialState: ConstructorReducerInitialState = {
  rightBlockElements: [],
  leftBlockElements: ["display", "mathsOperators", "numbers", "equal"],
};

export const constructorReducer = (
  state = initialState,
  action: constructorReducerAction
): ConstructorReducerInitialState => {
  switch (action.type) {
    case constructorReducerActionTypes.SET_ELEMENT_TO_RIGHT_BLOCK: {
      if (action.payload === "display") {
        return {
          ...state,
          rightBlockElements: [action.payload, ...state.rightBlockElements],
        };
      }
      return {
        ...state,
        rightBlockElements: [...state.rightBlockElements, action.payload],
      };
    }
    case constructorReducerActionTypes.REMOVE_ELEMENT_FROM_RIGHT_BLOCK: {
      return {
        ...state,
        rightBlockElements: state.rightBlockElements.filter(
          (el) => el !== action.payload
        ),
      };
    }
    case constructorReducerActionTypes.SORT_ELEMENTS_IN_RIGHT_BLOCK: {
      let rightBlockElements = state.rightBlockElements;
      const currentIndex = rightBlockElements.indexOf(action.firstEl);
      const newIndex = rightBlockElements.indexOf(action.secondEl);
      rightBlockElements.splice(currentIndex, 1);
      rightBlockElements.splice(newIndex, 0, action.firstEl);
      rightBlockElements = rightBlockElements.filter(
        (item) => item !== "display"
      );
      return {
        ...state,
        rightBlockElements: ["display", ...rightBlockElements],
      };
    }
    default:
      return state;
  }
};

//action creators
export const setElementToRightBlock = (payload: constructorElement) => ({
  type: constructorReducerActionTypes.SET_ELEMENT_TO_RIGHT_BLOCK,
  payload,
});
export const sortElementsInRightBlock = (
  firstEl: constructorElement,
  secondEl: constructorElement
) => ({
  type: constructorReducerActionTypes.SORT_ELEMENTS_IN_RIGHT_BLOCK,
  firstEl,
  secondEl,
});
export const removeElementFromRightBlock = (payload: constructorElement) => ({
  type: constructorReducerActionTypes.REMOVE_ELEMENT_FROM_RIGHT_BLOCK,
  payload,
});
