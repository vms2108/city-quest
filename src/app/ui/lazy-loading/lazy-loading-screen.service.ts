import { Injectable } from '@angular/core';
import { ScreenTypesEnum } from 'src/app/common/enums/screen-types.enum';
import { Screen } from 'src/app/common/interfaces/screen.interface';
import { ScreenCommonComponent } from 'src/app/ui/screens/screen-common/screen-common.component';
import { ScreenSubjectsComponent } from 'src/app/ui/screens/screen-subjects/screen-subjects.component';

export type ALLTYPES =
  typeof ScreenCommonComponent |
  typeof ScreenSubjectsComponent;

export type ALLCOMPONENTS =
  ScreenCommonComponent |
  ScreenSubjectsComponent;

@Injectable()
export class LazyLoadingScreenService {

  public async getComponentByScreen(screen: Screen): Promise<ALLTYPES> {
    switch (screen.type) {

      case ScreenTypesEnum.COMMON : {
        const { ScreenCommonComponent } = await import('src/app/ui/screens/screen-common/screen-common.component');
        return ScreenCommonComponent;
      }

      case ScreenTypesEnum.SUBJECTS : {
        const { ScreenSubjectsComponent } = await import('src/app/ui/screens/screen-subjects/screen-subjects.component');
        return ScreenSubjectsComponent;
      }

      default : {
        const { ScreenCommonComponent } = await import('src/app/ui/screens/screen-common/screen-common.component');
        return ScreenCommonComponent;
      }
    }
  }
}
