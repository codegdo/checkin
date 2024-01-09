import { Form as OriginalForm } from "./form.component";
import { FormField } from './form.field';

type ExtendedForm = typeof OriginalForm & {
  Field: typeof FormField;
};

const Form = OriginalForm as ExtendedForm;
Form.Field = FormField;

export { Form };
