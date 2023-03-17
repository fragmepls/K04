import { DbService } from './db.service';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class MyValidators {
  static themeExists(db: DbService) {
    return function (
      control: AbstractControl
    ): Observable<ValidationErrors | null> {
      return from(db.checkThemeExists(control.value)).pipe(
        map((data) => (data ? null : { themeExists: true }))
      );
    };
  }
}
