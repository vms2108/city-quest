import { AbstractControl, ValidationErrors } from '@angular/forms';

export function hasSpacesValidator(control: AbstractControl): ValidationErrors | null {
  const value = (control.value || '');
  const regexp = /^\S*$/;

  if (regexp.test(value)) {
    return null;
  }

  return { 'has-spaces': true };
}
