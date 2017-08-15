import { FormGroup, ValidatorFn } from '@angular/forms';


export class CkValidator {
  static same(other: string): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } => {
      const parent = group.parent;
      if(parent) {
        const newPassword = parent.controls[other].value
        const confirmation = group.value
        return (newPassword !== confirmation) ? { same: true } : null;
      }
      return null;
    }
  }

  static different(other: string): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } => {
      const parent = group.parent;
      if(parent) {
        const newPassword = group.value
        const oldPassword = parent.controls[other].value
        return (newPassword === oldPassword) ? { different: true } : null;
      }
      return null;
    }
  }
}