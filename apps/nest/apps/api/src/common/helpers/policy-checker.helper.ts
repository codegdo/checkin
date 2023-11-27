import { Injectable } from '@nestjs/common';

export interface PolicyStatement {
  effect: 'Allow' | 'Deny';
  action: string | string[];
  resource: string | string[];
  condition?: { [key: string]: string | string[] | boolean };
}

export interface Policy {
  version: string;
  statement: PolicyStatement[];
}

export interface RequestContext {
  action: string | string[];
  resource: string | string[];
  condition?: { [key: string]: string | string[] | boolean };
}

@Injectable()
export class PolicyChecker {
  private evaluateCondition(
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

  private matchesWildcard(action: string, wildcard: string): boolean {
    const regex = new RegExp(`^${wildcard.replace('*', '.*')}$`);
    return regex.test(action);
  }

  private isPolicyAllowed(
    policy: Policy,
    requestContext: RequestContext,
  ): boolean {
    if (policy.statement) {
      let isAllowed = false; // Default to denied

      for (const statement of policy.statement) {
        const effect = statement.effect;
        const actions = Array.isArray(statement.action)
          ? statement.action
          : [statement.action];
        const resources = Array.isArray(statement.resource)
          ? statement.resource
          : [statement.resource];
        const condition = statement.condition;

        const isActionAllowed =
          actions.includes('*') ||
          actions.some((action) =>
            Array.isArray(requestContext.action)
              ? requestContext.action.some((reqAction) =>
                this.matchesWildcard(reqAction, action),
              )
              : this.matchesWildcard(requestContext.action, action),
          );

        const isResourceAllowed =
          resources.includes('*') ||
          resources.some((resource) =>
            (Array.isArray(requestContext.resource)
              ? requestContext.resource
              : [requestContext.resource]
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

  verifyPermissionAgainstPolicies(
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

  verifyPermissions(
    policies: Policy[],
    requestContexts: RequestContext[],
  ): boolean {
    const allowedPermissions: boolean[] = [];

    for (const requestContext of requestContexts) {
      const isAllowed = this.verifyPermissionAgainstPolicies(
        policies,
        requestContext,
      );
      allowedPermissions.push(isAllowed);
    }

    return allowedPermissions.every((permission) => permission);
  }

  getAllowedActions(
    policies: Policy[],
    requestContexts: RequestContext[],
  ): string[] {
    const allowedActions: string[] = [];

    for (const requestContext of requestContexts) {
      const isAllowed = this.verifyPermissionAgainstPolicies(
        policies,
        requestContext,
      );

      if (isAllowed) {
        const actionParts = Array.isArray(requestContext.action)
          ? requestContext.action.map((action) => action.split(':'))
          : [requestContext.action.split(':')];

        for (const parts of actionParts) {
          if (parts.length === 2) {
            allowedActions.push(parts[1]);
          }
        }
      }
    }

    return allowedActions;
  }
}

/*
// Sample policies with components (module, view, object, field) and conditions
const samplePolicies: Policy[] = [
  {
    version: '1',
    permission: {},
    statement: [
      {
        id: 1,
        effect: 'Allow',
        action: '*',
        resource: '*',
      },
      {
        id: 2,
        effect: 'Deny',
        action: 'database:Access', 
        resource: 'module:database'
      },
    ],
  },
  // Add additional policies
];

// Define a sample request context
const requestContexts: RequestContext[] = [
  { 
    action: 'database:Access', 
    resource: 'module:database' 
  },
  {
    action: 'migration:getAllMigrations',
    resource: 'view:migration'
  }
];

const policyChecker = new PolicyChecker();
const isAllowed = policyChecker.verifyPermissions(samplePolicies, requestContexts);
console.log(`Request is ${isAllowed ? 'allowed' : 'denied'}`);

requestContextArray [ 'database:migration:getAllMigrations' ]
convertRequestContextArrayToObject [
  [
    { 
      actions: 'database:Access', 
      resource: 'module:database' },
    {
      actions: 'migration:getAllMigrations',
      resource: 'view:migration'
    }
  ]
]
*/
