import { Inject, Injectable } from '@angular/core';
import { APIErrors } from 'src/app/common/api-errors/api-errors.interface';
import { API_ERRORS } from 'src/app/common/api-errors/api-errors.token';

@Injectable()
export abstract class ApiErrorsRecorderBase {

  protected abstract readonly errors: APIErrors;

  public constructor(@Inject(API_ERRORS) private apiErrors: Map<string, string>) {
  }

  public registerErrors(): void {
    Object
      .keys(this.errors)
      .forEach(code => {
        this.apiErrors.set(code, this.errors[code]);
      });
  }
}
