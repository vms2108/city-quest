import { FileTypesEnum } from '../enum/file-types.enum';

import { BaseFile } from './base-file';

export class LoadedFile extends BaseFile<string> {
  public readonly type = FileTypesEnum.LOADED;
}
