import { ActionType } from "../action-types";
import { Action } from "../actions";
import bundle from "../../bundler";
import { Dispatch } from "react";

// redux - thunk
export const createBundle = (cellId: string, input: string) => {
  
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId
      }
    });

    const result = await bundle(input);
  
    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: {...result}
      }
    });
  }
}
