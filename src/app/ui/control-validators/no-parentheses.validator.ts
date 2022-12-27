import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noParenthesesValidator(control: AbstractControl): ValidationErrors | null {
  const value = (control.value || '');
  const regexp = /^[^()]*$/;

  if (regexp.test(value)) {
    return null;
  }

  return { 'no-parentheses': true };
}
