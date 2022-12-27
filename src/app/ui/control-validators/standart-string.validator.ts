import { AbstractControl, ValidationErrors } from '@angular/forms';

export function standartStringValidator(control: AbstractControl): ValidationErrors | null {
  const value = (control.value || '');
  const regexp = /^[^!@#$%^*()\[\]{}'"|\\\/;:,а-яА-Я?№~`\+=]*$/;

  if (regexp.test(value)) {
    return null;
  }

  return { 'standart-string': true };
}
