import { Injectable } from '@angular/core';
import { BlockTypeEnum } from './enums/block-type.enum';
import { BLOCK_DISTRIBUTION_TYPES } from './block-distribution.types';

@Injectable({
  providedIn: 'root'
})
export class BlockDistributionService {
  public async getComponentFactory(type: BlockTypeEnum): Promise<BLOCK_DISTRIBUTION_TYPES> {
    switch (type) {
      case BlockTypeEnum.TEXT: {
        const { BlockTextComponent } = await import('src/app/ui/blocks/block-text/block-text.component');
        return BlockTextComponent;
      }
      case BlockTypeEnum.IMAGE: {
        const { BlockPictureComponent } = await import('src/app/ui/blocks/block-picture/block-picture.component');
        return BlockPictureComponent;
      }
      case BlockTypeEnum.AUDIO: {
        const { BlockAudioComponent } = await import('src/app/ui/blocks/block-audio/block-audio.component');
        return BlockAudioComponent;
      }
      default: {
        const { BlockTextComponent } = await import('src/app/ui/blocks/block-text/block-text.component');
        return BlockTextComponent;
      }
    }
  }
}
