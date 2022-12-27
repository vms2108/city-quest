import { FileTypesEnum } from '../enum/file-types.enum';

export abstract class BaseFile<TData> {
  public readonly type!: FileTypesEnum;
  constructor(
    public data: TData,
  ) {}
}
