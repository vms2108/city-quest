import { Injectable } from '@angular/core';
import { ScreenTypesEnum } from 'src/app/common/enums/screen-types.enum';
import { Screen } from 'src/app/common/interfaces/screen.interface';
import { ScreenWygComponent } from 'src/app/ui/screens/screen-wyg/screen-wyg.component';
import { ScreenCommonComponent } from 'src/app/ui/screens/screen-common/screen-common.component';
import { ScreenEmailComponent } from 'src/app/ui/screens/screen-email/screen-email.component';
import { ScreenSubjectsComponent } from 'src/app/ui/screens/screen-subjects/screen-subjects.component';
import { ScreenPayComponent } from 'src/app/ui/screens/screen-pay/screen-pay.component';
import { ScreenReviewComponent } from 'src/app/ui/screens/screen-review/screen-review.component';

export type ALLTYPES =
  typeof ScreenCommonComponent |
  typeof ScreenSubjectsComponent |
  typeof ScreenEmailComponent |
  typeof ScreenWygComponent |
  typeof ScreenPayComponent |
  typeof ScreenReviewComponent;

export type ALLCOMPONENTS =
  ScreenCommonComponent |
  ScreenSubjectsComponent |
  ScreenEmailComponent |
  ScreenWygComponent |
  ScreenPayComponent |
  ScreenReviewComponent;

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

      case ScreenTypesEnum.WYG : {
        const { ScreenWygComponent } = await import('src/app/ui/screens/screen-wyg/screen-wyg.component');
        return ScreenWygComponent;
      }

      case ScreenTypesEnum.EMAIL : {
        const { ScreenEmailComponent } = await import('src/app/ui/screens/screen-email/screen-email.component');
        return ScreenEmailComponent;
      }

      case ScreenTypesEnum.PAY : {
        const { ScreenPayComponent } = await import('src/app/ui/screens/screen-pay/screen-pay.component');
        return ScreenPayComponent;
      }

      case ScreenTypesEnum.REVIEW : {
        const { ScreenReviewComponent } = await import('src/app/ui/screens/screen-review/screen-review.component');
        return ScreenReviewComponent;
      }

      default : {
        const { ScreenCommonComponent } = await import('src/app/ui/screens/screen-common/screen-common.component');
        return ScreenCommonComponent;
      }
    }
  }
}
