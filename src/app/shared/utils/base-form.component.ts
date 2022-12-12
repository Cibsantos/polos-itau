import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class BaseFormComponent {
  constructor(private snackBar: MatSnackBar) { }

  hasError(formControl: AbstractControl, errorName: string) {
    return (formControl.dirty || formControl.touched) && formControl.hasError(errorName);
  }

  openSnackBar(message: string, action: string, panelClass = 'default-snackbar'): any {
    this.snackBar.open(message, action, { panelClass });
  }

  //for debug purpose
  getAllErrors(form: UntypedFormGroup | UntypedFormArray): { [key: string]: any } | null {
    let hasError = false;

    const result = Object.keys(form.controls).reduce((acc, key) => {
      const control = form.get(key);
      const errors =
        control instanceof UntypedFormGroup || control instanceof UntypedFormArray
          ? this.getAllErrors(control)
          : control?.errors;
      if (errors) {
        acc[key] = errors;
        hasError = true;
      }
      return acc;
    }, {} as { [key: string]: any });

    return hasError ? result : null;
  }
}
