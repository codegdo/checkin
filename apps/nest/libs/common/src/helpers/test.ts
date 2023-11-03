/* enum DataType {
  MODULE = 'module',
  VIEW = 'view',
  OBJECT = 'object',
  FIELD = 'field',
}

type DataMapping = {
  module: string;
  moduleName?: string;
  moduleGroup: string;

  view: string;
  viewName?: string;
  viewGroup: string;

  object: string;
  objectSlug?: string;
};

type ModuleData = {
  name: string;
  group: string;
  type: DataType.MODULE;
};

type ViewData = {
  name: string;
  group: string;
  type: DataType.VIEW;
};

type ObjectData = {
  name: string;
  slug: string;
  type: DataType.OBJECT;
};

type DataStructure = {
  modules: Record<string, ModuleData>;
  views: Record<string, Record<string, ViewData>>;
  objects: Record<string, Record<string, ObjectData>>;
};

function mapDataToDataStructure(
  model: DataStructure,
  data: DataMapping,
): DataStructure {
  const { modules, views, objects } = model;

  const moduleData: ModuleData = {
    name: data.moduleName || data.module,
    group: data.moduleGroup,
    type: DataType.MODULE,
  };

  const viewData: ViewData = {
    name: data.viewName || data.view,
    group: data.viewGroup,
    type: DataType.VIEW,
  };

  const objectData: ObjectData = {
    name: data.object,
    slug: data.objectSlug || data.object,
    type: DataType.OBJECT,
  };

  return {
    modules: {
      ...modules,
      [data.module]: { ...moduleData },
    },
    views: {
      ...views,
      [data.module]: {
        ...views[data.module],
        [data.view]: { ...viewData },
      },
    },
    objects: {
      ...objects,
      [data.view]: {
        ...objects[data.view],
        [data.object]: { ...objectData },
      },
    },
  };
}

function dataMapper(dataList: DataMapping[]): DataStructure {
  return dataList.reduce(
    (model, data) => {
      return mapDataToDataStructure(model, data);
    },
    { modules: {}, views: {}, objects: {} },
  );
}

// Sample data
const data: DataMapping[] = [
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
const dataStructure = dataMapper(data);

// Output the result
console.log(JSON.stringify(dataStructure, null, 2));
 */