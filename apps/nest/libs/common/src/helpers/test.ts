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

/*
enum DataType {
  MODULE = 'module',
  VIEW = 'view',
  OBJECT = 'object',
  FIELD = 'field',
}
type DataStructure = {
  modules: Record<string, ViewData[]>;
  views: Record<string, ViewData[]>;
  objects: Record<string, ObjectData[]>;
  actions: Record<string, string[]>;
};
type ModuleData = {
  name: string;
  group: string;
  //type: DataType.MODULE;
  sortOrder: string | null;
};

type ViewData = {
  name: string;
  group: string;
  //type: DataType.VIEW;
  sortOrder: string | null;
};

type ObjectData = {
  name: string;
  slug: string;
  //type: DataType.OBJECT;
  sortOrder: string | null;
};

type DataMapping = {
  module: string;
  moduleName?: string;
  moduleGroup: string;
  moduleSortOrder: string | null;

  view: string;
  viewName?: string;
  viewGroup: string;
  viewSortOrder: string | null;
  
  object: string;
  objectSlug?: string;
  objectSortOrder: string | null;

  action: string | null;
};

class DataMapper {
  private dataStructure: DataStructure;

  constructor() {
    this.dataStructure = {
      modules: {},
      views: {},
      objects: {},
      actions: {},
    };
  }

  private addModule(data: DataMapping): void {
    const { module, moduleName, moduleGroup, moduleSortOrder } = data;
    
    if (!module) return;

    if (!this.dataStructure.modules[moduleGroup]) {
      this.dataStructure.modules[moduleGroup] = [];
    }

    // Check if the module already exists in the array
    const existingModule = this.dataStructure.modules[moduleGroup].find(
      (m) => m.name === module,
    );

    if (!existingModule) {
      const moduleData: ModuleData = {
        name: moduleName || module,
        group: moduleGroup,
        //type: DataType.MODULE,
        sortOrder: moduleSortOrder,
      };
      this.dataStructure.modules[moduleGroup].push(moduleData);
    }
  }

  private addView(data: DataMapping): void {
    const { module, view, viewGroup, viewSortOrder } = data;
    if (!module || !view) return;

    if (!this.dataStructure.views[module]) {
      this.dataStructure.views[module] = [];
    }

    // Check if the view already exists in the array
    const existingView = this.dataStructure.views[module].find(
      (v) => v.name === view,
    );

    if (!existingView) {
      const viewData: ViewData = {
        name: view,
        group: viewGroup,
        //type: DataType.VIEW,
        sortOrder: viewSortOrder,
      };
      this.dataStructure.views[module].push(viewData);
    }
  }

  private addObject(data: DataMapping): void {
    const { view, object, objectSlug, objectSortOrder } = data;
    if (!view || !object) return;

    if (!this.dataStructure.objects[view]) {
      this.dataStructure.objects[view] = [];
    }

    // Check if the object already exists in the array
    const existingObject = this.dataStructure.objects[view].find(
      (obj) => obj.name === object,
    );

    if (!existingObject) {
      const objectData: ObjectData = {
        name: object,
        slug: objectSlug || object,
        //type: DataType.OBJECT,
        sortOrder: objectSortOrder,
      };
      this.dataStructure.objects[view].push(objectData);
    }
  }

  private addAction(data: DataMapping): void {
    const { view, action } = data;
    if (!view || !action) return;

    if (!this.dataStructure.actions[view]) {
      this.dataStructure.actions[view] = [];
    }

    // Check if the action already exists in the array
    const existingAction = this.dataStructure.actions[view].includes(action);

    if (!existingAction) {
      this.dataStructure.actions[view].push(action);
    }
  }

  private sortBySortOrder(
    a: string | number | null,
    b: string | number | null,
  ): number {
    const sortOrderA = a === null ? 0 : typeof a === 'string' ? parseInt(a) : a;
    const sortOrderB = b === null ? 0 : typeof b === 'string' ? parseInt(b) : b;

    return sortOrderA - sortOrderB;
  }

  private sortItemsBySortOrder<T extends { sortOrder: string | number | null }>(
    items: T[],
  ): T[] {
    return items.sort((a, b) => this.sortBySortOrder(a.sortOrder, b.sortOrder));
  }

  private mapData(data: DataMapping): void {
    this.addModule(data);
    this.addView(data);
    this.addObject(data);
    this.addAction(data);
  }

  public mapDataToDataStructure(dataList: DataMapping[]): DataStructure {
    dataList.forEach((data) => this.mapData(data));

    // Sort modules, views, and objects based on the sortOrder property.
    //this.dataStructure.modules = this.sortItemsBySortOrder(
      //this.dataStructure.modules,
    //);

    Object.keys(this.dataStructure.modules).forEach((module) => {
      return (this.dataStructure.modules[module] = this.sortItemsBySortOrder(
        this.dataStructure.modules[module],
      ));
    });

    Object.keys(this.dataStructure.views).forEach((module) => {
      return (this.dataStructure.views[module] = this.sortItemsBySortOrder(
        this.dataStructure.views[module],
      ));
    });

    Object.keys(this.dataStructure.objects).forEach((view) => {
      return (this.dataStructure.objects[view] = this.sortItemsBySortOrder(
        this.dataStructure.objects[view],
      ));
    });

    return this.dataStructure;
  }
}


// Sample data
const data: DataMapping[] = [
    {
      "view": "users",
      "action": null,
      "module": "admin",
      "object": "policy",
      "viewGroup": "sys_admin",
      "objectSlug": "policies",
      "moduleGroup": "sys",
      "viewSortOrder": "1",
      "moduleSortOrder": "2",
      "objectSortOrder": "4"
    },
    {
      "view": "users",
      "action": null,
      "module": "admin",
      "object": "role",
      "viewGroup": "sys_admin",
      "objectSlug": "roles",
      "moduleGroup": "sys",
      "viewSortOrder": "1",
      "moduleSortOrder": "2",
      "objectSortOrder": "3"
    },
    {
      "view": "users",
      "action": null,
      "module": "admin",
      "object": "group",
      "viewGroup": "sys_admin",
      "objectSlug": "groups",
      "moduleGroup": "sys",
      "viewSortOrder": "1",
      "moduleSortOrder": "2",
      "objectSortOrder": "2"
    },
    {
      "view": "users",
      "action": null,
      "module": "admin",
      "object": "user",
      "viewGroup": "sys_admin",
      "objectSlug": "users",
      "moduleGroup": "sys",
      "viewSortOrder": "1",
      "moduleSortOrder": "2",
      "objectSortOrder": "1"
    },
    {
      "view": "clients",
      "action": null,
      "module": "admin",
      "object": "company",
      "viewGroup": "sys_admin",
      "objectSlug": "companies",
      "moduleGroup": "sys",
      "viewSortOrder": "2",
      "moduleSortOrder": "2",
      "objectSortOrder": "7"
    },
    {
      "view": "clients",
      "action": null,
      "module": "admin",
      "object": "account",
      "viewGroup": "sys_admin",
      "objectSlug": "accounts",
      "moduleGroup": "sys",
      "viewSortOrder": "2",
      "moduleSortOrder": "2",
      "objectSortOrder": "6"
    },
    {
      "view": "migrations",
      "action": "assignScriptsToMigration",
      "module": "admin",
      "object": "migration_rolback",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "getAllMigrations",
      "module": "admin",
      "object": "migration_rolback",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "getMigrationById",
      "module": "admin",
      "object": "migration_rolback",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "getScriptsForMigration",
      "module": "admin",
      "object": "migration_rolback",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "getRollbacksForMigration",
      "module": "admin",
      "object": "migration_rolback",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "createNewMigration",
      "module": "admin",
      "object": "migration_rolback",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "migrationRunById",
      "module": "admin",
      "object": "migration_rolback",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "migrationRollbackById",
      "module": "admin",
      "object": "migration_rolback",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "getAllMigrationCategories",
      "module": "admin",
      "object": "migration_rolback",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "getMigrationCategoryById",
      "module": "admin",
      "object": "migration_rolback",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "createNewMigrationCategory",
      "module": "admin",
      "object": "migration_rolback",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "getAllMigrationScripts",
      "module": "admin",
      "object": "migration_rolback",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "getMigrationScriptById",
      "module": "admin",
      "object": "migration_rolback",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "createNewMigrationScript",
      "module": "admin",
      "object": "migration_rolback",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "assignScriptsToMigration",
      "module": "admin",
      "object": "migration_script",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "getAllMigrations",
      "module": "admin",
      "object": "migration_script",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "getMigrationById",
      "module": "admin",
      "object": "migration_script",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "getScriptsForMigration",
      "module": "admin",
      "object": "migration_script",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "getRollbacksForMigration",
      "module": "admin",
      "object": "migration_script",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "createNewMigration",
      "module": "admin",
      "object": "migration_script",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "migrationRunById",
      "module": "admin",
      "object": "migration_script",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "migrationRollbackById",
      "module": "admin",
      "object": "migration_script",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "getAllMigrationCategories",
      "module": "admin",
      "object": "migration_script",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "getMigrationCategoryById",
      "module": "admin",
      "object": "migration_script",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "createNewMigrationCategory",
      "module": "admin",
      "object": "migration_script",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "getAllMigrationScripts",
      "module": "admin",
      "object": "migration_script",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "getMigrationScriptById",
      "module": "admin",
      "object": "migration_script",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "createNewMigrationScript",
      "module": "admin",
      "object": "migration_script",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "assignScriptsToMigration",
      "module": "admin",
      "object": "migration_category",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "getAllMigrations",
      "module": "admin",
      "object": "migration_category",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "getMigrationById",
      "module": "admin",
      "object": "migration_category",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "getScriptsForMigration",
      "module": "admin",
      "object": "migration_category",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "getRollbacksForMigration",
      "module": "admin",
      "object": "migration_category",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "createNewMigration",
      "module": "admin",
      "object": "migration_category",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "migrationRunById",
      "module": "admin",
      "object": "migration_category",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "migrationRollbackById",
      "module": "admin",
      "object": "migration_category",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "getAllMigrationCategories",
      "module": "admin",
      "object": "migration_category",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "getMigrationCategoryById",
      "module": "admin",
      "object": "migration_category",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "createNewMigrationCategory",
      "module": "admin",
      "object": "migration_category",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "getAllMigrationScripts",
      "module": "admin",
      "object": "migration_category",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "getMigrationScriptById",
      "module": "admin",
      "object": "migration_category",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "createNewMigrationScript",
      "module": "admin",
      "object": "migration_category",
      "viewGroup": "sys_admin",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "assignScriptsToMigration",
      "module": "admin",
      "object": "migration",
      "viewGroup": "sys_admin",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "9"
    },
    {
      "view": "migrations",
      "action": "getAllMigrations",
      "module": "admin",
      "object": "migration",
      "viewGroup": "sys_admin",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "9"
    },
    {
      "view": "migrations",
      "action": "getMigrationById",
      "module": "admin",
      "object": "migration",
      "viewGroup": "sys_admin",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "9"
    },
    {
      "view": "migrations",
      "action": "getScriptsForMigration",
      "module": "admin",
      "object": "migration",
      "viewGroup": "sys_admin",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "9"
    },
    {
      "view": "migrations",
      "action": "getRollbacksForMigration",
      "module": "admin",
      "object": "migration",
      "viewGroup": "sys_admin",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "9"
    },
    {
      "view": "migrations",
      "action": "createNewMigration",
      "module": "admin",
      "object": "migration",
      "viewGroup": "sys_admin",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "9"
    },
    {
      "view": "migrations",
      "action": "migrationRunById",
      "module": "admin",
      "object": "migration",
      "viewGroup": "sys_admin",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "9"
    },
    {
      "view": "migrations",
      "action": "migrationRollbackById",
      "module": "admin",
      "object": "migration",
      "viewGroup": "sys_admin",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "9"
    },
    {
      "view": "migrations",
      "action": "getAllMigrationCategories",
      "module": "admin",
      "object": "migration",
      "viewGroup": "sys_admin",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "9"
    },
    {
      "view": "migrations",
      "action": "getMigrationCategoryById",
      "module": "admin",
      "object": "migration",
      "viewGroup": "sys_admin",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "9"
    },
    {
      "view": "migrations",
      "action": "createNewMigrationCategory",
      "module": "admin",
      "object": "migration",
      "viewGroup": "sys_admin",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "9"
    },
    {
      "view": "migrations",
      "action": "getAllMigrationScripts",
      "module": "admin",
      "object": "migration",
      "viewGroup": "sys_admin",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "9"
    },
    {
      "view": "migrations",
      "action": "getMigrationScriptById",
      "module": "admin",
      "object": "migration",
      "viewGroup": "sys_admin",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "9"
    },
    {
      "view": "migrations",
      "action": "createNewMigrationScript",
      "module": "admin",
      "object": "migration",
      "viewGroup": "sys_admin",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "3",
      "moduleSortOrder": "2",
      "objectSortOrder": "9"
    },
    {
      "view": "profile",
      "action": null,
      "module": "account",
      "object": "role",
      "viewGroup": "app_account",
      "objectSlug": "roles",
      "moduleGroup": "app",
      "viewSortOrder": "5",
      "moduleSortOrder": "6",
      "objectSortOrder": "16"
    },
    {
      "view": "profile",
      "action": null,
      "module": "account",
      "object": "group",
      "viewGroup": "app_account",
      "objectSlug": "groups",
      "moduleGroup": "app",
      "viewSortOrder": "5",
      "moduleSortOrder": "6",
      "objectSortOrder": "15"
    },
    {
      "view": "profile",
      "action": null,
      "module": "account",
      "object": "user",
      "viewGroup": "app_account",
      "objectSlug": "users",
      "moduleGroup": "app",
      "viewSortOrder": "5",
      "moduleSortOrder": "6",
      "objectSortOrder": "14"
    },
    {
      "view": "users",
      "action": null,
      "module": "iam",
      "object": "policy",
      "viewGroup": "app_iam",
      "objectSlug": "policies",
      "moduleGroup": "app",
      "viewSortOrder": "7",
      "moduleSortOrder": "7",
      "objectSortOrder": "21"
    },
    {
      "view": "users",
      "action": null,
      "module": "iam",
      "object": "role",
      "viewGroup": "app_iam",
      "objectSlug": "roles",
      "moduleGroup": "app",
      "viewSortOrder": "7",
      "moduleSortOrder": "7",
      "objectSortOrder": "20"
    },
    {
      "view": "users",
      "action": null,
      "module": "iam",
      "object": "group",
      "viewGroup": "app_iam",
      "objectSlug": "groups",
      "moduleGroup": "app",
      "viewSortOrder": "7",
      "moduleSortOrder": "7",
      "objectSortOrder": "19"
    },
    {
      "view": "users",
      "action": null,
      "module": "iam",
      "object": "user",
      "viewGroup": "app_iam",
      "objectSlug": "users",
      "moduleGroup": "app",
      "viewSortOrder": "7",
      "moduleSortOrder": "7",
      "objectSortOrder": "18"
    }
  ];

const dataMapper = new DataMapper();
const dataStructure: DataStructure = dataMapper.mapDataToDataStructure(data);
console.log(dataStructure);

*/