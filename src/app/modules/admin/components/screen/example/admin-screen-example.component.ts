import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { Screen } from 'src/app/common/interfaces/screen.interface';
import { ALLCOMPONENTS, LazyLoadingScreenService } from 'src/app/ui/lazy-loading/lazy-loading-screen.service';

@Component({
  selector: 'cq-admin-screen-example',
  templateUrl: './admin-screen-example.component.html',
  styleUrls: ['./admin-screen-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminScreenExampleComponent implements OnChanges {
  @Input()
  public screen!: Screen;

  @ViewChild('screenContainer', { read: ViewContainerRef })
  public screenContainer!: ViewContainerRef;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly lazyLoadingScreenService: LazyLoadingScreenService,
  ) {}

  public ngOnChanges(): void {
    if (this.screen) {
      this.loadScreen(this.screen);
    }
  }

  private async loadScreen(screen: Screen): Promise<void> {
    const screenFactory = await this.lazyLoadingScreenService.getComponentByScreen(screen);
    this.screenContainer.clear();
    
    const component = this.screenContainer.createComponent<ALLCOMPONENTS>(screenFactory);
    component.instance.screen = screen;
    component.instance.fromAdmin = true;
    (component.instance as any).ngOnChanges();
    
    this.changeDetectorRef.markForCheck();
  }
}
