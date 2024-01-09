import * as Yup from 'yup';

class FormValidatorHelper {
  validator: typeof Yup

  constructor(yub: typeof Yup) {
    this.validator = yub;
  }

  object() {
    return this.validator.object();
  }
}

export const formValidator = new FormValidatorHelper(Yup);