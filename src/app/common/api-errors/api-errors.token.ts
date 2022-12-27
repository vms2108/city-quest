import { InjectionToken } from '@angular/core';

export const API_ERRORS = new InjectionToken<Map<string, string>>('API_ERRORS_TOKEN', {
  providedIn: 'root',
  factory: () => new Map<string, string>(),
});
