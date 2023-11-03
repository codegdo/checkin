function sortAndGroupViews(views) {
  const groupedViews = {};

  for (const key in views) {
    let group = key;

    if (views[key].group) {
      const parts = views[key].group.split('_');
      group = parts[parts.length - 1];
    }

    if (!groupedViews[group]) {
      groupedViews[group] = [];
    }

    // Loop through the nested keys and add them to the group
    for (const nestedKey in views[key]) {
      if (nestedKey !== 'group') {
        groupedViews[group].push(nestedKey);
      }
    }
  }

  return groupedViews;
}

const v = {
  monitor: {
    metrics: {
      name: 'metrics',
      group: 'sys_monitor',
      type: 'view',
      sortOrder: '2',
    },
  },
  client: {
    accounts: {
      name: 'accounts',
      group: 'sys_client',
      type: 'view',
      sortOrder: '9',
    },
    companies: {
      name: 'companies',
      group: 'sys_client',
      type: 'view',
      sortOrder: '10',
    },
    subscriptions: {
      name: 'subscriptions',
      group: 'sys_client',
      type: 'view',
      sortOrder: '11',
    },
    payments: {
      name: 'payments',
      group: 'sys_client',
      type: 'view',
      sortOrder: '12',
    },
    invoices: {
      name: 'invoices',
      group: 'sys_client',
      type: 'view',
      sortOrder: '13',
    },
  },
  database: {
    migrations: {
      name: 'migrations',
      group: 'sys_database',
      type: 'view',
      sortOrder: '16',
    },
    'migration-categories': {
      name: 'migration-categories',
      group: 'sys_database',
      type: 'view',
      sortOrder: '17',
    },
    'migration-scripts': {
      name: 'migration-scripts',
      group: 'sys_database',
      type: 'view',
      sortOrder: '18',
    },
    'migration-rollbacks': {
      name: 'migration-rollbacks',
      group: 'sys_database',
      type: 'view',
      sortOrder: '19',
    },
    'migration-tags': {
      name: 'migration-tags',
      group: 'sys_database',
      type: 'view',
      sortOrder: '20',
    },
  },
  'sys-setting': {
    configs: {
      name: 'configs',
      group: 'sys_setting',
      type: 'view',
      sortOrder: '28',
    },
  },
  iam: {
    users: {
      name: 'users',
      group: 'app_iam',
      type: 'view',
      sortOrder: '35',
    },
    groups: {
      name: 'groups',
      group: 'app_iam',
      type: 'view',
      sortOrder: '36',
    },
    roles: {
      name: 'roles',
      group: 'app_iam',
      type: 'view',
      sortOrder: '37',
    },
    policies: {
      name: 'policies',
      group: 'app_iam',
      type: 'view',
      sortOrder: '38',
    },
    permissions: {
      name: 'permissions',
      group: 'app_iam',
      type: 'view',
      sortOrder: '39',
    },
  },
  visitor: {
    customers: {
      name: 'customers',
      group: 'app_visitor',
      type: 'view',
      sortOrder: '46',
    },
    'customer-groups': {
      name: 'customer-groups',
      group: 'app_visitor',
      type: 'view',
      sortOrder: '47',
    },
  },
};

const groupedViews = sortAndGroupViews(v);
console.log(groupedViews);
