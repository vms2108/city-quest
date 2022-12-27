import { FileTypesEnum } from '../enum/file-types.enum';

import { BaseFile } from './base-file';

export class LocalFile extends BaseFile<File> {
  public readonly type = FileTypesEnum.LOCAL;
}
