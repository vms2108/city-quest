import { initialScreenState, ScreenState } from '../states/screen.state';

import { EScreenActions, ScreenActions } from './../actions/screen.actions';

export const screenReducers = (
  state = initialScreenState,
  action: ScreenActions,
): ScreenState => {
  switch (action.type) {
    case EScreenActions.UpdateScreensList: {
      return {
        ...state,
        list: action.payload,
      };
    }

    default : return state;
  }
};
