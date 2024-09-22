import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ProductService } from '../product.service';
import { catchError, map, of } from 'rxjs';

const dateReleaseValidator = (control: any) => {
    const inputValue = control.value;

    if (!inputValue) {
        return null;
    }

    const selectedDateTime = new Date(inputValue + 'T00:00:00');
    const now = new Date();

    selectedDateTime.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    if (selectedDateTime < now) {
        return { dateIsInPast: true };
    }

    return null;
}

const dateRevisionValidator = (dateReleaseControlName: string): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        const formGroup = control.parent;
        if (!formGroup) {
            return null;
        }

        const dateReleaseControl = formGroup.get(dateReleaseControlName);
        if (!dateReleaseControl) {
            return null;
        }

        const dateReleaseValue = dateReleaseControl.value;
        const dateRevisionValue = control.value;

        if (!dateReleaseValue || !dateRevisionValue) {
            return null;
        }

        const dateRelease = new Date(dateReleaseValue + 'T00:00:00');
        const dateRevision = new Date(dateRevisionValue + 'T00:00:00');

        const oneYearEarlier = new Date(dateRelease);
        oneYearEarlier.setFullYear(dateRelease.getFullYear() - 1);

        return dateRevision.getTime() === oneYearEarlier.getTime() ? null : { invalidDateRevision: true };
    };
}

const isValidIdValidator = (_productService: ProductService, idControlName: string): AsyncValidatorFn => {
    return (control: AbstractControl) => {
        const formGroup = control.parent;
        if (!formGroup) {
            return of(null);
        }

        const idControl = formGroup.get(idControlName);
        if (!idControl) {
            return of(null);
        }

        const idControlValue = idControl.value;

        if (!idControlValue) {
            return of(null);
        }

        return _productService.verificationProduct(idControlValue).pipe(
            map((isInvalid) => {
                return isInvalid ? { invalidId: true } : null;
            }),
            catchError(() => {
                return of({ invalidId: true });
            })
        );
    };
};

export { dateReleaseValidator, dateRevisionValidator, isValidIdValidator };