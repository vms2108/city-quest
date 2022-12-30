import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ImageService } from './image.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ImageService,
  ],
})
export class ImageModule{}
