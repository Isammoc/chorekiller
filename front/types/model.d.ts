import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../src/state/root.reducer";
import client from "../src/client";

declare global {
  type CKClient = ReturnType<typeof client>;
  type CKState = AppState;
  type CKAction = AnyAction;
  type CKThunkExtraParams = { client: CKClient };
  type CKDispatch = ThunkDispatch<CKState, CKThunkExtraParams, CKAction>
}
