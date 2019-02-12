import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../src/state/root.reducer";

declare global {
  type CKState = AppState;
  type CKAction = AnyAction;
  type CKDispatch = ThunkDispatch<CKState, {}, CKAction>
}
