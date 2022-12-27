import { AbstractControl, ValidationErrors } from '@angular/forms';

const expr = /^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

export function urlValidator(control: AbstractControl): ValidationErrors | null {
  const value = (control.value || '');

  if (value.length === 0 || expr.test(value)) {
    return null;
  }

  return { url: true };
}
