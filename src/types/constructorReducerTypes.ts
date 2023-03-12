export enum constructorReducerActionTypes {
  SET_ELEMENT_TO_RIGHT_BLOCK = "SET_ELEMENT_TO_RIGHT_BLOCK",
  REMOVE_ELEMENT_FROM_RIGHT_BLOCK = "REMOVE_ELEMENT_FROM_RIGHT_BLOCK",
  SORT_ELEMENTS_IN_RIGHT_BLOCK = "SORT_ELEMENTS_IN_RIGHT_BLOCK",
}

export type constructorElement =
  | "display"
  | "mathsOperators"
  | "numbers"
  | "equal"
  | null;

export interface ConstructorReducerInitialState {
  rightBlockElements: Array<constructorElement>;
  leftBlockElements: Array<constructorElement>;
}

interface removeElementFromRightList {
  type: constructorReducerActionTypes.REMOVE_ELEMENT_FROM_RIGHT_BLOCK;
  payload: constructorElement;
}

interface setElementToRightList {
  type: constructorReducerActionTypes.SET_ELEMENT_TO_RIGHT_BLOCK;
  payload: constructorElement;
}

interface sortElementInRightBlock {
  type: constructorReducerActionTypes.SORT_ELEMENTS_IN_RIGHT_BLOCK;
  firstEl: constructorElement;
  secondEl: constructorElement;
}

export type constructorReducerAction =
  | setElementToRightList
  | removeElementFromRightList
  | sortElementInRightBlock;
