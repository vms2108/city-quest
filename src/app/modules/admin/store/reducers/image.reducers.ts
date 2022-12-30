import { ImageState, initialImageState } from '../states/image.state';

import { EImageActions, ImageActions } from './../actions/image.actions';

export const imageReducers = (
  state = initialImageState,
  action: ImageActions,
): ImageState => {
  switch (action.type) {
    case EImageActions.UpdateImagesList: {
      return {
        ...state,
        list: action.payload,
      };
    }

    default : return state;
  }
};
