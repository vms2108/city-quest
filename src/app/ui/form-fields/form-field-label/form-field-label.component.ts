import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'cq-form-field-label',
  templateUrl: './form-field-label.component.html',
  styleUrls: ['./form-field-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldLabelComponent {

  @Input()
  public label!: string;

  @Input()
  public required = false;

  @Input()
  public tooltip: string | null = null;

  @ContentChild('template', { static: true })
  public template!: TemplateRef<any>;

}
