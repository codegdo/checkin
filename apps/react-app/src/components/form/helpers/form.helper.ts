import * as Yup from 'yup';

export type ObjectSchema = Yup.ObjectSchema<Yup.AnyObject, {}>;

class FormHelper {
    validation: typeof Yup;

    constructor(yup: typeof Yup) {
        this.validation = yup;
    }

    fieldSchema() {
        return this.validation.string().required();
    }

    schema() {
        return this.validation.object();
    }
}

export const formHelper = new FormHelper(Yup);
export const objSchema = formHelper.schema();