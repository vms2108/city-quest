import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { LocalFile } from '../models/local-file';

export function maxSizeOfLocalFileValidator(maxSize: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = <LocalFile | null> control.value;

    if (!value) {
      return null;
    }

    if (value.data.size <= maxSize) {
      return null;
    }

    return { 'max-size-of-local-file': true };
  };
}
