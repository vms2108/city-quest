import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function uniqueArrayItemsValidator<TItem = any>(identityItemFn = (item: TItem): any => item): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const items = ((control.value || []) as TItem[]).filter(item => item !== null);
    const itemsSet = new Set();

    for (let i = 0, l = items.length; i < l; i++) {
      const identityItem = identityItemFn(items[i]);

      if (identityItem !== null && itemsSet.has(identityItem)) {
        return { 'unique-array-items': true };
      }

      itemsSet.add(identityItem);
    }

    return null;
  };
}
