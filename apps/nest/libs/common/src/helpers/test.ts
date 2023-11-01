type ModuleViewObjectData = {
  module: string;
  moduleName?: string;
  moduleGroup: string;

  view: string;
  viewName?: string;
  viewGroup: string;

  object: string;
  objectSlug?: string;
};

enum PermissionType {
  MODULE = 'module',
  VIEW = 'view',
  OBJECT = 'object',
  FIELD = 'field',
}

type ModulePermission = {
  name: string;
  group: string;
  type: PermissionType.MODULE;
};

type ViewPermission = {
  name: string;
  group: string;
  type: PermissionType.VIEW;
};

type ObjectPermission = {
  name: string;
  slug: string;
  type: PermissionType.OBJECT;
};

type Model = {
  modules: Record<string, ModulePermission>;
  views: Record<string, Record<string, ViewPermission>>;
  objects: Record<string, Record<string, ObjectPermission>>;
};

function mapDataToPermissions(
  permissions: Model,
  data: ModuleViewObjectData,
): Model {
  const { modules, views, objects } = permissions;
  const modulePermission: ModulePermission = {
    name: data.moduleName || data.module,
    group: data.moduleGroup,
    type: PermissionType.MODULE,
  };

  const viewPermission: ViewPermission = {
    name: data.viewName || data.view,
    group: data.viewGroup,
    type: PermissionType.VIEW,
  };

  const objectPermission: ObjectPermission = {
    name: data.object,
    slug: data.objectSlug || data.object,
    type: PermissionType.OBJECT,
  };

  return {
    modules: {
      ...modules,
      [data.module]: { ...modulePermission },
    },
    views: {
      ...views,
      [data.module]: {
        ...views[data.module],
        [data.view]: { ...viewPermission },
      },
    },
    objects: {
      ...objects,
      [data.view]: {
        ...objects[data.view],
        [data.object]: { ...objectPermission },
      },
    },
  };
}

function groupModuleViewObjectData(dataList: ModuleViewObjectData[]): Model {
  return dataList.reduce(
    (permissions, data) => {
      return mapDataToPermissions(permissions, data);
    },
    { modules: {}, views: {}, objects: {} },
  );
}

// Sample data
const data: ModuleViewObjectData[] = [
  {
    view: 'metrics',
    module: 'monitor',
    object: 'metric',
    viewGroup: 'sys-monitor',
    objectSlug: 'metrics',
    moduleGroup: 'sys',
  },
  {
    view: 'migrations',
    module: 'database',
    object: 'migration',
    viewGroup: 'sys-database',
    objectSlug: 'migrations',
    moduleGroup: 'sys',
  },
  {
    view: 'migrations',
    module: 'database',
    object: 'migration_category',
    viewGroup: 'sys-database',
    objectSlug: 'migration-categories',
    moduleGroup: 'sys',
  },
  {
    view: 'migrations',
    module: 'database',
    object: 'migration_script',
    viewGroup: 'sys-database',
    objectSlug: 'migration-scripts',
    moduleGroup: 'sys',
  },
  {
    view: 'migrations',
    module: 'database',
    object: 'migration_rolback',
    viewGroup: 'sys-database',
    objectSlug: 'migration-rolbacks',
    moduleGroup: 'sys',
  },
  {
    view: 'migrations',
    module: 'database',
    object: 'migration_tag',
    viewGroup: 'sys-database',
    objectSlug: 'migration-tags',
    moduleGroup: 'sys',
  },
  {
    view: 'migrations',
    module: 'database',
    object: 'migration_metadata',
    viewGroup: 'sys-database',
    objectSlug: 'migration-metadata',
    moduleGroup: 'sys',
  },
  {
    view: 'migration-categories',
    module: 'database',
    object: 'migration_category',
    viewGroup: 'sys-database',
    objectSlug: 'migration-categories',
    moduleGroup: 'sys',
  },
  {
    view: 'migration-scripts',
    module: 'database',
    object: 'migration_script',
    viewGroup: 'sys-database',
    objectSlug: 'migration-scripts',
    moduleGroup: 'sys',
  },
  {
    view: 'migration-rollbacks',
    module: 'database',
    object: 'migration_rolback',
    viewGroup: 'sys-database',
    objectSlug: 'migration-rolbacks',
    moduleGroup: 'sys',
  },
  {
    view: 'migration-tags',
    module: 'database',
    object: 'migration_tag',
    viewGroup: 'sys-database',
    objectSlug: 'migration-tags',
    moduleGroup: 'sys',
  },
  {
    view: 'accounts',
    module: 'client',
    object: 'account',
    viewGroup: 'sys-client',
    objectSlug: 'accounts',
    moduleGroup: 'sys',
  },
  {
    view: 'accounts',
    module: 'client',
    object: 'company',
    viewGroup: 'sys-client',
    objectSlug: 'companies',
    moduleGroup: 'sys',
  },
  {
    view: 'accounts',
    module: 'client',
    object: 'subscription',
    viewGroup: 'sys-client',
    objectSlug: 'subscriptions',
    moduleGroup: 'sys',
  },
  {
    view: 'accounts',
    module: 'client',
    object: 'payment',
    viewGroup: 'sys-client',
    objectSlug: 'payments',
    moduleGroup: 'sys',
  },
  {
    view: 'accounts',
    module: 'client',
    object: 'invoice',
    viewGroup: 'sys-client',
    objectSlug: 'invoices',
    moduleGroup: 'sys',
  },
  {
    view: 'companies',
    module: 'client',
    object: 'company',
    viewGroup: 'sys-client',
    objectSlug: 'companies',
    moduleGroup: 'sys',
  },
  {
    view: 'supscriptions',
    module: 'client',
    object: 'subscription',
    viewGroup: 'sys-client',
    objectSlug: 'subscriptions',
    moduleGroup: 'sys',
  },
  {
    view: 'payments',
    module: 'client',
    object: 'payment',
    viewGroup: 'sys-client',
    objectSlug: 'payments',
    moduleGroup: 'sys',
  },
  {
    view: 'invoices',
    module: 'client',
    object: 'invoice',
    viewGroup: 'sys-client',
    objectSlug: 'invoices',
    moduleGroup: 'sys',
  },
  {
    view: 'configs',
    module: 'sys-setting',
    object: 'config',
    viewGroup: 'sys-setting',
    objectSlug: 'configs',
    moduleGroup: 'setting',
  },
  {
    view: 'users',
    module: 'iam',
    object: 'user',
    viewGroup: 'app-iam',
    objectSlug: 'users',
    moduleGroup: 'app',
  },
  {
    view: 'users',
    module: 'iam',
    object: 'group',
    viewGroup: 'app-iam',
    objectSlug: 'groups',
    moduleGroup: 'app',
  },
  {
    view: 'users',
    module: 'iam',
    object: 'role',
    viewGroup: 'app-iam',
    objectSlug: 'roles',
    moduleGroup: 'app',
  },
  {
    view: 'users',
    module: 'iam',
    object: 'policy',
    viewGroup: 'app-iam',
    objectSlug: 'policies',
    moduleGroup: 'app',
  },
  {
    view: 'users',
    module: 'iam',
    object: 'permission',
    viewGroup: 'app-iam',
    objectSlug: 'permissions',
    moduleGroup: 'app',
  },
  {
    view: 'groups',
    module: 'iam',
    object: 'group',
    viewGroup: 'app-iam',
    objectSlug: 'groups',
    moduleGroup: 'app',
  },
  {
    view: 'roles',
    module: 'iam',
    object: 'role',
    viewGroup: 'app-iam',
    objectSlug: 'roles',
    moduleGroup: 'app',
  },
  {
    view: 'policies',
    module: 'iam',
    object: 'policy',
    viewGroup: 'app-iam',
    objectSlug: 'policies',
    moduleGroup: 'app',
  },
  {
    view: 'permissions',
    module: 'iam',
    object: 'permission',
    viewGroup: 'app-iam',
    objectSlug: 'permissions',
    moduleGroup: 'app',
  },
  {
    view: 'customers',
    module: 'visitor',
    object: 'customer',
    viewGroup: 'app-visitor',
    objectSlug: 'customers',
    moduleGroup: 'app',
  },
  {
    view: 'customer-groups',
    module: 'visitor',
    object: 'customer_group',
    viewGroup: 'app-visitor',
    objectSlug: 'customer-groups',
    moduleGroup: 'app',
  },
];

// Call the function to group the data
const permissions = groupModuleViewObjectData(data);

// Output the result
console.log(JSON.stringify(permissions, null, 2));
