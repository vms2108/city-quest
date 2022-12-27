import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'cq-dialog-container-basic',
  templateUrl: './dialog-container-basic.component.html',
  styleUrls: ['./dialog-container-basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContainerBasicComponent implements AfterContentInit {

  @Input()
  public dialogTitle!: string;

  @ContentChild('contentSection', { static: true })
  public contentTemplate!: TemplateRef<void>;

  @ContentChildren('actionButton')
  public actionButtonsTemplatesList!: QueryList<TemplateRef<void>>;

  public actionButtonsTemplates: TemplateRef<void>[] = [];

  public ngAfterContentInit(): void {
    this.actionButtonsTemplates = this.actionButtonsTemplatesList.toArray();
  }

}
