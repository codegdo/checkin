import * as yup from 'yup';
import { ObjectSchema, ValidationError, AnyObject } from 'yup';
import { Field, FormEvents, FormValues } from '../types';
import { Condition, VisibilityRule } from '@/types';

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

  fieldValidation(field: Field, events: FormEvents, values: FormValues) {
    switch (field.type) {
      case 'number':
        return this.validationNumber(field, events, values);
      default:
        return this.validationString(field, events, values);
    }
  }

  validationNumber(field: Field, events: FormEvents, values: FormValues) {
    const { name, isRequired, validation = {}, visibility = [] } = field;
    let validate = this.validation.number();

    if (isRequired) {
      validate = validate.required();

      if (validation.max !== undefined) {
        validate = validate.max(validation.max, `Maximum ${validation.max} allowed.`);
      }

      if (validation.min !== undefined) {
        validate = validate.min(validation.min, `Minimum ${validation.min} required.`);
      }
    }

    if (visibility.length > 0) {
      validate = validate.test('visibility', 'visibility test', (value, schema) => {

        events['username'].update('test');
        console.log(value, values, schema);
        return true; // Return true for non-conditional cases
      });
    }
    return validate;
  }

  validationString(field: Field, events: FormEvents, values: FormValues) {
    const { type, isRequired, validation = {}, visibility = [] } = field;
    let validate = this.validation.string();

    if (isRequired) {
      validate = validate.required();

      if (validation.max !== undefined) {
        validate = validate.max(validation.max, `Maximum ${validation.max} characters allowed.`);
      }

      if (validation.min !== undefined) {
        validate = validate.min(validation.min, `Minimum ${validation.min} characters required.`);
      }

      if (validation.length !== undefined) {
        validate = validate.length(validation.length, `String must be exactly ${validation.length} characters`);
      }

      if (validation.pattern !== undefined) {
        validate = validate.matches(validation.pattern, 'Invalid format.');
      }
    }

    if (type == 'email') {
      validate = validate.email().test("is-valid", (message) => `${message.path} is invalid`, (value) => this.isValidEmail(value))
    }

    if (visibility.length > 0) {
      validate = validate.test('visibility', 'visibility', (value, schema) => {

        for (const visibilityRule of visibility) {
          const visibility = this.checkConditions(visibilityRule, values);
          console.log(`Visibility for ${visibilityRule.title}:`, visibility);
        }

        return true; // Return true for non-conditional cases
      });
    }

    return validate;
  }

  checkFieldCondition(condition: Condition, data: Record<string, string>): boolean {
    const conditionValue = data[condition.fieldId];
    const valueToCompare = condition.caseSensitivity ? condition.value : condition.value.toLowerCase();
    //console.log('checkFieldCondition', condition, data, conditionValue, valueToCompare);
    switch (condition.comparison) {
      case 'equals':
        return condition.caseSensitivity
          ? conditionValue === valueToCompare
          : conditionValue.toLowerCase() === valueToCompare;
      case 'contains':
        return condition.caseSensitivity
          ? conditionValue.includes(valueToCompare)
          : conditionValue.toLowerCase().includes(valueToCompare);
      case 'startsWith':
        return condition.caseSensitivity
          ? conditionValue.startsWith(valueToCompare)
          : conditionValue.toLowerCase().startsWith(valueToCompare);
      case 'endsWith':
        return condition.caseSensitivity
          ? conditionValue.endsWith(valueToCompare)
          : conditionValue.toLowerCase().endsWith(valueToCompare);
      default:
        return false; // Invalid comparison type
    }
  }

  checkConditions(visibilityRule: VisibilityRule, data: Record<string, string>): boolean {
    const operations: (boolean | 'and' | 'or')[] = [];

    for (const condition of visibilityRule.rules) {
      const operator = condition.operator;
      const result = this.checkFieldCondition(condition, data);
      operations.push(result, operator);
    }

    console.log('operations', operations);

    let finalResult = operations[0] as boolean;

    for (let i = 1; i < operations.length; i += 2) {
      const operator = operations[i] as 'and' | 'or';
      const result = operations[i + 1] as boolean ?? false;

      console.log('Iteration:', i, 'Operator:', operator, 'Result:', result);

      if (operator === 'and') {
        finalResult = finalResult && result;
      } else if (operator === 'or') {
        finalResult = finalResult || result;
      }
    }

    console.log('finalResult', finalResult);

    return finalResult;
  }

  isValidEmail(email: string | null | undefined) {
    if (!email) {
      return true;
    }
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  }

  get objSchema() {
    return this.validation.object();
  }
}

export const formHelper = new FormHelper(yup);
export const objSchema = formHelper.objSchema;
export { ValidationError };
export type { AnyObject };
