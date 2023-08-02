import * as Yup from 'yup';

export type ObjectSchema = Yup.ObjectSchema<Yup.AnyObject, object>;

export type ValidationError = Yup.ValidationError;

class FormHelper {
    validation: typeof Yup;

    constructor(yup: typeof Yup) {
        this.validation = yup;
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

    fieldSchema() {
        return this.validation.string().required();
    }

    get schema() {
        return this.validation.object();
    }
}

export const formHelper = new FormHelper(Yup);
export const objSchema = formHelper.schema;