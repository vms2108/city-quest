import { BlockAudioComponent } from 'src/app/ui/blocks/block-audio/block-audio.component';
import { BlockTextComponent } from 'src/app/ui/blocks/block-text/block-text.component';
import { BlockPictureComponent } from 'src/app/ui/blocks/block-picture/block-picture.component';

export type BLOCK_DISTRIBUTION_TYPES =
  typeof BlockTextComponent |
  typeof BlockPictureComponent |
  typeof BlockAudioComponent;

export type BLOCK_DISTRIBUTION_COMPONENTS =
  BlockTextComponent |
  BlockPictureComponent |
  BlockAudioComponent;
