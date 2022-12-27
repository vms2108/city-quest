import { Injectable } from '@angular/core';

import { LoadedFile } from './loaded-file';
import { LocalFile } from './local-file';

@Injectable()
export class FileFactory {
  public createLocalFile(file: File): LocalFile {
    return new LocalFile(file);
  }

  public createLoadedFile(url: string): LoadedFile {
    return new LoadedFile(url);
  }
}
