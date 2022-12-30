
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ImageService } from 'src/app/common/data/image/image.service';
import { ScreenImage } from 'src/app/common/models/screen-image';

import { EImageActions, GetImagesFromServer, UpdateImagesList } from '../actions/image.actions';

@Injectable()
export class ImageEffects {
  public updateImages = createEffect(() => {
    return this.actions.pipe(
      ofType<GetImagesFromServer>(EImageActions.GetImagesFromServer),
      switchMap(() => this.imageService.loadList()),
      switchMap((images: ScreenImage[]) => {
        return of(new UpdateImagesList(images));
      }),
    );
  });

  constructor(
    private readonly imageService: ImageService,
    private readonly actions: Actions,
  ) {}
}
