import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minArrayLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = ((control.value || []) as any[]).filter(item => item !== null);

    if (value.length >= minLength) {
      return null;
    }

    return { 'min-array-length': true };
  };
}
