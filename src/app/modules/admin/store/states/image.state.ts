import { ScreenImage } from 'src/app/common/models/screen-image';

export interface ImageState {
  list: ScreenImage[] | null;
}

export const initialImageState: ImageState = {
  list: null,
};
