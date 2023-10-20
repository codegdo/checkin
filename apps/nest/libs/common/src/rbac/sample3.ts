interface PolicyStatement {
  effect: 'Allow' | 'Deny';
  actions: string | string[];
  resources: string | string[];
  condition?: { [key: string]: string | string[] | boolean };
}

interface Policy {
  version: string;
  statements: PolicyStatement[];
}

interface RequestContext {
  actions: string | string[];
  resources: string | string[];
  condition?: { [key: string]: string | string[] | boolean };
}

function evaluateCondition(condition: { [key: string]: string | string[] | boolean }, context: { [key: string]: string | string[] | boolean }): boolean {
  for (const key of Object.keys(condition)) {
    if (key in context) {
      const conditionValue = condition[key];
      const contextValue = context[key];

      if (Array.isArray(conditionValue)) {
        if (Array.isArray(contextValue)) {
          if (!conditionValue.some(val => (contextValue as string[]).includes(val as string))) {
            return false;
          }
        } else if (!conditionValue.includes(contextValue as string)) {
          return false;
        }
      } else if (Array.isArray(contextValue)) {
        if (!(contextValue as string[]).includes(conditionValue as string)) {
          return false;
        }
      } else if (conditionValue !== contextValue) {
        return false;
      }
    } else {
      return false;
    }
  }

  return true;
}

function isPolicyAllowed(policy: Policy, requestContext: RequestContext): boolean {
  const statementResults: boolean[] = [];

  if (policy.statements) {
    for (const statement of policy.statements) {
      const effect = statement.effect;
      const actions = Array.isArray(statement.action) ? statement.action : [statement.action];
      const resources = Array.isArray(statement.resource) ? statement.resource : [statement.resource];
      const condition = statement.condition || {};

      const isActionAllowed = (
        (Array.isArray(actions) ? actions : [actions])
          .includes(requestContext.action) || actions.includes('*')
      );
      const isResourceAllowed = (
        (Array.isArray(resources) ? resources : [resources])
          .includes(requestContext.resource) || resources.includes('*')
      );

      if (effect === 'Deny') {
        return false; // Deny access immediately upon encountering a "Deny" statement
      } else if (isActionAllowed && isResourceAllowed) {
        if (evaluateCondition(condition, requestContext.conditions || {})) {
          return true;
        }
      }
    }
  }

  return false;
}

function verifyPermissionAgainstPolicies(policies: Policy[], requestContext: RequestContext): boolean {
  if (policies.length === 0) {
    return false; // Deny access if there are no policies
  }

  const policyResults: boolean[] = [];

  for (const policy of policies) {
    const isAllowed = isPolicyAllowed(policy, requestContext);
    policyResults.push(isAllowed);

    if (!isAllowed) {
      return false; // Deny access if any "Deny" statement is encountered
    }
  }

  return policyResults.every(result => result); // Allow access if all policies have "Allow" effect
}

function verifyPermissions(policies: Policy[], requestContexts: RequestContext[]): boolean {
  const verifyResults: boolean[] = [];

  for (const requestContext of requestContexts) {
    const isAllowed = verifyPermissionAgainstPolicies(policies, requestContext);
    verifyResults.push(isAllowed);
  }

  return verifyResults.every(result => result);
}

// Sample policies with components (module, view, object, field) and conditions
const samplePolicies: Policy[] = [
  {
    version: '2012-10-17',
    statements: [
      {
        effect: 'Allow',
        action: '*',
        resource: '*',
      }
    ],
  },
  // Add additional policies
];

// Define a sample request context
const requestContexts: RequestContext[] = [
  {
    actions: 'module:Access',
    resources: 'module:home'
  },
  {
    actions: ['view:Read', 'view:Write'],
    resources: 'view:dashboard'
  },
  {
    actions: 'object:Read',
    resources: 'object:user'
  }
];

const isAllowed = verifyPermissions(samplePolicies, requestContexts);
console.log(`Request is ${isAllowed ? 'allowed' : 'denied'}`);
