import { AbstractControl, ValidationErrors } from '@angular/forms';

export function uniqueStringValidator(list: string[], control: AbstractControl): ValidationErrors | null {
  const value = (control.value || '');

  if (list && list.length && list.find(item => item === value)) {
    return { 'unique-string': true };
  }

  return null;
}
