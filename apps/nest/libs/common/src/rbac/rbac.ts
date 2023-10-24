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

class PolicyChecker {
  static evaluateCondition(
    condition: { [key: string]: string | string[] | boolean },
    context: { [key: string]: string | string[] | boolean },
  ): boolean {
    for (const key of Object.keys(condition)) {
      if (key in context) {
        const conditionValue = condition[key];
        const contextValue = context[key];

        if (Array.isArray(conditionValue)) {
          if (Array.isArray(contextValue)) {
            if (
              !conditionValue.some((val) =>
                (contextValue as string[]).includes(val as string),
              )
            ) {
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

  private static matchesWildcard(action: string, wildcard: string): boolean {
    const regex = new RegExp(`^${wildcard.replace('*', '.*')}$`);
    return regex.test(action);
  }

  static isPolicyAllowed(
    policy: Policy,
    requestContext: RequestContext,
  ): boolean {
    if (policy.statements) {
      let isAllowed = false; // Default to denied

      for (const statement of policy.statements) {
        const effect = statement.effect;
        const actions = Array.isArray(statement.actions)
          ? statement.actions
          : [statement.actions];
        const resources = Array.isArray(statement.resources)
          ? statement.resources
          : [statement.resources];
        const condition = statement.condition;

        const isActionAllowed =
          actions.includes('*') ||
          actions.some((action) =>
            Array.isArray(requestContext.actions)
              ? requestContext.actions.some((reqAction) =>
                this.matchesWildcard(reqAction, action),
              )
              : this.matchesWildcard(requestContext.actions, action),
          );

        const isResourceAllowed =
          resources.includes('*') ||
          resources.some((resource) =>
            (Array.isArray(requestContext.resources)
              ? requestContext.resources
              : [requestContext.resources]
            ).includes(resource),
          );

        if (effect === 'Deny' && isActionAllowed && isResourceAllowed) {
          return false; // Deny access for "Deny" statements
        } else if (effect === 'Allow' && isActionAllowed && isResourceAllowed) {
          if (
            condition &&
            !this.evaluateCondition(condition, requestContext.condition || {})
          ) {
            continue; // Skip this "Allow" statement if the condition is not met
          }
          isAllowed = true; // Allow access when an "Allow" statement is satisfied
        }
      }

      return isAllowed; // Return the final result after processing all statements
    }

    return false;
  }

  static verifyPermissionAgainstPolicies(
    policies: Policy[],
    requestContext: RequestContext,
  ): boolean {
    if (policies.length === 0) {
      return false; // Deny access if there are no policies
    }

    const policyResults: boolean[] = [];

    for (const policy of policies) {
      const isAllowed = this.isPolicyAllowed(policy, requestContext);
      policyResults.push(isAllowed);

      if (!isAllowed) {
        return false; // Deny access if any "Deny" statement is encountered
      }
    }

    return policyResults.every((result) => result); // Allow access if all policies have "Allow" effect
  }

  static verifyPermissions(
    policies: Policy[],
    requestContexts: RequestContext[],
  ): boolean {
    const verifyResults: boolean[] = [];

    for (const requestContext of requestContexts) {
      const isAllowed = this.verifyPermissionAgainstPolicies(
        policies,
        requestContext,
      );
      verifyResults.push(isAllowed);
    }

    return verifyResults.every((result) => result);
  }
}

// Sample policies with components (module, view, object, field) and conditions
const samplePolicies: Policy[] = [
  {
    version: '2012-10-17',
    statements: [
      {
        effect: 'Allow',
        actions: 'manage:Access',
        resources: 'module:manage',
      },
      {
        effect: 'Allow',
        actions: ['migration:*'],
        resources: 'view:migration',
      },
      {
        effect: 'Allow',
        actions: 'migration:Read',
        resources: 'object:migration',
      },
    ],
  },
  // Add additional policies
];

// Define a sample request context
const requestContexts: RequestContext[] = [
  {
    actions: 'manage:Access',
    resources: 'module:manage',
  },
  {
    actions: 'migration:getAllMigrations',
    resources: 'view:migration',
  },
];

const isAllowed = PolicyChecker.verifyPermissions(
  samplePolicies,
  requestContexts,
);
console.log(`Request is ${isAllowed ? 'allowed' : 'denied'}`);
