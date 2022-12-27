import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxArrayLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = ((control.value || []) as any[]).filter(item => item !== null);

    if (value.length <= minLength) {
      return null;
    }

    return { 'max-array-length': true };
  };
}
