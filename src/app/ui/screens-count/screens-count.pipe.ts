import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'screensCount'
})
export class ScreensCountPipe implements PipeTransform {
  public transform(value: string, parameters: { [key: string]: number | string } = {}): string {
    if (!value) return value;

    const replacements = {
      '{free_screens_count}': parameters.free_screens_count ?? '',
      '{paid_screens_count}': parameters.paid_screens_count ?? '',
      '{screens_count}': parameters.screens_count ?? ''
    };

    return Object.entries(replacements).reduce(
      (result, [key, val]) => result.replace(key, String(val)),
      value
    );
  }
}

