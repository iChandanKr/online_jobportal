import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";
import * as validator from 'validator'

export class CustomValidators {
    static noSpaceAllowed(control: AbstractControl) {
        if (!control.value) return null;
        
        const hasSpace = String(control.value).includes(' ');
        return hasSpace ? { noSpaceAllowed: true } : null;
    }

    static validEmail(control:AbstractControl){
        if(!control.value) return null;

        if(!validator.isEmail(control.value)){
            return {invalidEmail:true}
        }
        return null
    }

    static validDOB(control:AbstractControl){
        if (!control.value) return null;

        const dob = new Date(control.value);
        const today = new Date();

        // Clear time portion for accurate date comparison
        const dobDate = new Date(dob.getFullYear(), dob.getMonth(), dob.getDate());
        const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        // Check for future date
        if (dobDate > todayDate) {
            return { futuredob: true };
        }
        return null
    }

    static passwordsMatch(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirmPassword')?.value;

        return password === confirmPassword ? null : { passwordMismatch: true };
      }
}