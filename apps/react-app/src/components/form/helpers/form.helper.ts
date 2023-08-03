import * as yup from 'yup';
import { ObjectSchema, ValidationError, AnyObject } from 'yup';

export type ObjectSchemaExtend = ObjectSchema<object, AnyObject, object, "">

class FormHelper {
    validation: typeof yup;

    constructor(validation: typeof yup) {
        this.validation = validation;
    }

    errorsWithFieldNames(validationError: ValidationError) {
        return validationError.inner.reduce((errors, error) => {
            // error.path contains the field name or field ID
            const fieldName = error.path as string;

            return {
                ...errors,
                [fieldName]: error.message,
            };
        }, {});
    }

    fieldValidation() {
        return this.validation.string().required();
    }

    get objSchema() {
        return this.validation.object();
    }
}

export const formHelper = new FormHelper(yup);
export const objSchema = formHelper.objSchema;
export { ValidationError };
export type { AnyObject };
