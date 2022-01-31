import Joi from 'joi';

export const setDetailsToErrors = (
  items: Joi.ValidationErrorItem[],
  errors: { [k: string]: string }
): any => {
  items.forEach((error) => {
    const key = error.context?.key;
    const message = error.message;

    if (key) {
      errors[key] = message;
    }
  });
};
