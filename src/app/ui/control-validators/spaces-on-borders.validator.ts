import { AbstractControl, ValidationErrors } from '@angular/forms';

export function spacesOnBordersValidator(control: AbstractControl): ValidationErrors | null {
  const value = (control.value || '');
  const trimmedValue = value.trim();

  if (value === trimmedValue) {
    return null;
  }

  return { 'spaces-on-borders': true };
}
