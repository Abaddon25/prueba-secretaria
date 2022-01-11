import { AbstractControl, ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export function twoControls(base: string, parent: string): ValidatorFn {
   return (groupform: AbstractControl): ValidationErrors | null => {
      const baseValue = groupform.get(base)?.value;
      const parentValue = groupform.get(parent)?.value;
      return baseValue || parentValue ? null : { valueEmpty: { base, parent } };
   };
}
