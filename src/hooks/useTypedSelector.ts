import { TypedUseSelectorHook, useSelector } from "react-redux";
import {appReducerType } from "../store/store";

export const useTypedSelector: TypedUseSelectorHook<appReducerType> =
  useSelector;
