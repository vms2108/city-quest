import { AfterContentInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { FONTS } from './common/constants/fonts';

@Component({
  selector: 'cq-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterContentInit {

  public ngAfterContentInit(): void {
    this.insertFonts();
  }

  private insertFonts(): void {
    const node = document.createElement('style');
    node.innerHTML = FONTS;
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
