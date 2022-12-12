import { Injectable } from '@angular/core';
import { ScreenTypesEnum } from 'src/app/common/enums/screen-types.enum';
import { QuestScreen } from 'src/app/common/models/quest-screen';
import { ScreenInfoComponent } from 'src/app/ui/screens/screen-info/screen-info.component';

@Injectable()
export class LazyLoadingScreenService {

  public async getComponentByScreen(screen: QuestScreen): Promise<typeof ScreenInfoComponent> {
    switch (screen.type) {
      case ScreenTypesEnum.INFO : {
        const { ScreenInfoComponent } = await import('src/app/ui/screens/screen-info/screen-info.component');
        return ScreenInfoComponent;
      }

      default : {
        const { ScreenInfoComponent } = await import('src/app/ui/screens/screen-info/screen-info.component');
        return ScreenInfoComponent;
      }
    }
  }
}
