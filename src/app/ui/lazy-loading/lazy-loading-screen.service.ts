import { Injectable } from '@angular/core';
import { ScreenTypesEnum } from 'src/app/common/enums/screen-types.enum';
import { QuestScreen } from 'src/app/common/models/quest-screen';
import { ScreenInfoComponent } from 'src/app/ui/screens/screen-info/screen-info.component';
import { ScreenQuestionFreeComponent } from 'src/app/ui/screens/screen-question-free/screen-question-free.component';
import { ScreenWayComponent } from 'src/app/ui/screens/screen-way/screen-way.component';

export type ALLTYPES =
  typeof ScreenQuestionFreeComponent |
  typeof ScreenInfoComponent |
  typeof ScreenWayComponent;

export type ALLCOMPONENTS =
  ScreenQuestionFreeComponent |
  ScreenInfoComponent |
  ScreenWayComponent;

@Injectable()
export class LazyLoadingScreenService {

  public async getComponentByScreen(screen: QuestScreen): Promise<ALLTYPES> {
    switch (screen.type) {
      case ScreenTypesEnum.INFO : {
        const { ScreenInfoComponent } = await import('src/app/ui/screens/screen-info/screen-info.component');
        return ScreenInfoComponent;
      }

      case ScreenTypesEnum.QUESTION_FREE : {
        const { ScreenQuestionFreeComponent } = await import('src/app/ui/screens/screen-question-free/screen-question-free.component');
        return ScreenQuestionFreeComponent;
      }

      case ScreenTypesEnum.WAY : {
        const { ScreenWayComponent } = await import('src/app/ui/screens/screen-way/screen-way.component');
        return ScreenWayComponent;
      }

      default : {
        const { ScreenInfoComponent } = await import('src/app/ui/screens/screen-info/screen-info.component');
        return ScreenInfoComponent;
      }
    }
  }
}
