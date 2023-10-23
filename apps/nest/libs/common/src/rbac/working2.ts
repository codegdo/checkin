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
  
  function evaluateCondition(
    condition: { [key: string]: string | string[] | boolean },
    context: { [key: string]: string | string[] | boolean }
  ): boolean {
    for (const key of Object.keys(condition)) {
      if (key in context) {
        const conditionValue = condition[key];
        const contextValue = context[key];
  
        if (typeof conditionValue === 'boolean') {
          if (conditionValue !== contextValue) {
            return false;
          }
        } else if (Array.isArray(conditionValue)) {
          if (Array.isArray(contextValue)) {
            if (!conditionValue.some(val => (contextValue as string[]).includes(val as string))) {
              return false;
            }
          } else if (Array.isArray(contextValue) && !conditionValue.includes(contextValue as string)) {
            return false;
          }
        } else if (Array.isArray(contextValue)) {
          if (!contextValue.includes(conditionValue as string)) {
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
  
  function evaluateActions(actions: string | string[], requestActions: string | string[]): boolean {
    actions = Array.isArray(actions) ? actions : [actions];
    requestActions = Array.isArray(requestActions) ? requestActions : [requestActions];
  
    return actions.includes('*') || requestActions.some(action => actions.includes(action));
  }
  
  function evaluateResources(resources: string | string[], requestResources: string | string[]): boolean {
    resources = Array.isArray(resources) ? resources : [resources];
    requestResources = Array.isArray(requestResources) ? requestResources : [requestResources];
  
    return resources.includes('*') || requestResources.some(resource => resources.includes(resource));
  }
  
  function isPolicyAllowed(policy: Policy, requestContext: RequestContext): boolean[] {
    const statementResults: boolean[] = [];
  
    if (policy.statements) {
      for (const statement of policy.statements) {
        const { effect, actions, resources, condition } = statement;
  
        const isActionAllowed = evaluateActions(actions, requestContext.actions);
        const isResourceAllowed = evaluateResources(resources, requestContext.resources);
  
        if (effect === 'Deny' && isActionAllowed && isResourceAllowed) {
          return [false]; // Deny access immediately upon encountering a "Deny" statement
        } else if (effect === 'Allow' && isActionAllowed && isResourceAllowed) {
          if (condition && evaluateCondition(condition, requestContext.condition || {})) {
            statementResults.push(true);
          } else {
            statementResults.push(isActionAllowed);
            statementResults.push(isResourceAllowed);
          }
        } else {
          statementResults.push(isActionAllowed);
          statementResults.push(isResourceAllowed);
        }
      }
    }
  
    return statementResults;
  }
  
  function verifyPermissionAgainstPolicies(policies: Policy[], requestContext: RequestContext): boolean[] {
    if (policies.length === 0) {
      return [false]; // Deny access if there are no policies
    }
  
    const policyResults: boolean[][] = [];
  
    for (const policy of policies) {
      const isAllowed = isPolicyAllowed(policy, requestContext);
  
      policyResults.push(isAllowed);
  
    }
    console.log(policyResults[0]);
    return policyResults[0];
  }
  
  function check3DArrayForTrue(arrays: boolean[][]): boolean {
    return arrays.some(subArray => subArray.every(item => item === true));
  }
  
  function verifyPermissions(policies: Policy[], requestContexts: RequestContext[]): boolean {
    const verifyResults: boolean[][] = [];
  
    for (const requestContext of requestContexts) {
      const isAllowed = verifyPermissionAgainstPolicies(policies, requestContext);
      verifyResults.push(isAllowed);
    }
  
    console.log(verifyResults);
    return check3DArrayForTrue(verifyResults);
  }
  
  // Sample policies with components (module, view, object, field) and conditions
  const samplePolicies: Policy[] = [
    {
      version: '2012-10-17',
      statements: [
        {
          effect: 'Allow',
          actions: '*',
          resources: '*',
        },
        {
          effect: 'Allow',
          actions: ['view:Read'],
          resources: '*',
        }
      ],
    },
    // Add additional policies
  ];
  
  // Define a sample request context
  const requestContexts: RequestContext[] = [
    {
      actions: 'module:Read',
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
  
  const isPermissionAllowed = verifyPermissions(samplePolicies, requestContexts);
  console.log(`Request is ${isPermissionAllowed ? 'allowed' : 'denied'}`);
  