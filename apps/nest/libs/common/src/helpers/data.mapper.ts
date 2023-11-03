enum DataType {
  MODULE = 'module',
  VIEW = 'view',
  OBJECT = 'object',
  FIELD = 'field',
}
type DataStructure = {
  modules: ModuleData[];
  views: Record<string, ViewData[]>;
  objects: Record<string, ObjectData[]>;
};
type ModuleData = {
  name: string;
  group: string;
  type: DataType.MODULE;
  sortOrder: string | null;
};

type ViewData = {
  name: string;
  group: string;
  type: DataType.VIEW;
  sortOrder: string | null;
};

type ObjectData = {
  name: string;
  slug: string;
  type: DataType.OBJECT;
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
};

export class DataMapper {
  private dataStructure: DataStructure;

  constructor() {
    this.dataStructure = {
      modules: [],
      views: {},
      objects: {},
    };
  }

  private mapData(data: DataMapping): void {
    if (data.module) {
      if (
        !this.dataStructure.modules.find(
          (module) => module.name === data.module,
        )
      ) {
        const moduleData: ModuleData = {
          name: data.moduleName || data.module,
          group: data.moduleGroup,
          type: DataType.MODULE,
          sortOrder: data.moduleSortOrder,
        };

        this.dataStructure.modules.push(moduleData);
      }
    }

    if (data.view) {
      if (!this.dataStructure.views[data.module]) {
        this.dataStructure.views[data.module] = [];
      }

      // Check if the view already exists in the array
      const existingView = this.dataStructure.views[data.module].find(
        (view) => view.name === (data.viewName || data.view),
      );

      if (!existingView) {
        const viewData: ViewData = {
          name: data.viewName || data.view,
          group: data.viewGroup,
          type: DataType.VIEW,
          sortOrder: data.viewSortOrder,
        };

        this.dataStructure.views[data.module].push(viewData);
      }
    }

    if (data.object) {
      if (!this.dataStructure.objects[data.view]) {
        this.dataStructure.objects[data.view] = [];
      }

      const objectData: ObjectData = {
        name: data.object,
        slug: data.objectSlug || data.object,
        type: DataType.OBJECT,
        sortOrder: data.objectSortOrder,
      };

      this.dataStructure.objects[data.view].push(objectData);
    }
  }

  public mapDataToDataStructure(dataList: DataMapping[]): DataStructure {
    dataList.forEach((data) => {
      this.mapData(data);
    });

    // Sort modules, views, and objects based on the sortOrder property.
    this.dataStructure.modules.sort((a, b) => {
      if (a.sortOrder === null && b.sortOrder === null) return 0;
      if (a.sortOrder === null) return 1;
      if (b.sortOrder === null) return -1;
      return parseInt(a.sortOrder) - parseInt(b.sortOrder);
    });

    Object.keys(this.dataStructure.views).forEach((module) => {
      this.dataStructure.views[module].sort((a, b) => {
        if (a.sortOrder === null && b.sortOrder === null) return 0;
        if (a.sortOrder === null) return 1;
        if (b.sortOrder === null) return -1;
        return parseInt(a.sortOrder) - parseInt(b.sortOrder);
      });
    });

    Object.keys(this.dataStructure.objects).forEach((view) => {
      this.dataStructure.objects[view].sort((a, b) => {
        if (a.sortOrder === null && b.sortOrder === null) return 0;
        if (a.sortOrder === null) return 1;
        if (b.sortOrder === null) return -1;
        return parseInt(a.sortOrder) - parseInt(b.sortOrder);
      });
    });

    return this.dataStructure;
  }
}

/*
// Sample data
const data: DataMapping[] = [
  {
    view: 'metrics',
    module: 'monitor',
    object: 'metric',
    viewGroup: 'sys_monitor',
    objectSlug: 'metrics',
    moduleGroup: 'sys',
    viewSortOrder: '2',
    moduleSortOrder: '1',
    objectSortOrder: '1',
  },
  {
    view: 'accounts',
    module: 'client',
    object: 'invoice',
    viewGroup: 'sys_client',
    objectSlug: 'invoices',
    moduleGroup: 'sys',
    viewSortOrder: '9',
    moduleSortOrder: '4',
    objectSortOrder: '7',
  },
  {
    view: 'accounts',
    module: 'client',
    object: 'payment',
    viewGroup: 'sys_client',
    objectSlug: 'payments',
    moduleGroup: 'sys',
    viewSortOrder: '9',
    moduleSortOrder: '4',
    objectSortOrder: '6',
  },
  {
    view: 'accounts',
    module: 'client',
    object: 'subscription',
    viewGroup: 'sys_client',
    objectSlug: 'subscriptions',
    moduleGroup: 'sys',
    viewSortOrder: '9',
    moduleSortOrder: '4',
    objectSortOrder: '5',
  },
  {
    view: 'accounts',
    module: 'client',
    object: 'company',
    viewGroup: 'sys_client',
    objectSlug: 'companies',
    moduleGroup: 'sys',
    viewSortOrder: '9',
    moduleSortOrder: '4',
    objectSortOrder: '4',
  },
  {
    view: 'accounts',
    module: 'client',
    object: 'account',
    viewGroup: 'sys_client',
    objectSlug: 'accounts',
    moduleGroup: 'sys',
    viewSortOrder: '9',
    moduleSortOrder: '4',
    objectSortOrder: '3',
  },
  {
    view: 'companies',
    module: 'client',
    object: 'company',
    viewGroup: 'sys_client',
    objectSlug: 'companies',
    moduleGroup: 'sys',
    viewSortOrder: '10',
    moduleSortOrder: '4',
    objectSortOrder: '4',
  },
  {
    view: 'subscriptions',
    module: 'client',
    object: 'subscription',
    viewGroup: 'sys_client',
    objectSlug: 'subscriptions',
    moduleGroup: 'sys',
    viewSortOrder: '11',
    moduleSortOrder: '4',
    objectSortOrder: '5',
  },
  {
    view: 'payments',
    module: 'client',
    object: 'payment',
    viewGroup: 'sys_client',
    objectSlug: 'payments',
    moduleGroup: 'sys',
    viewSortOrder: '12',
    moduleSortOrder: '4',
    objectSortOrder: '6',
  },
  {
    view: 'invoices',
    module: 'client',
    object: 'invoice',
    viewGroup: 'sys_client',
    objectSlug: 'invoices',
    moduleGroup: 'sys',
    viewSortOrder: '13',
    moduleSortOrder: '4',
    objectSortOrder: '7',
  },
  {
    view: 'migrations',
    module: 'database',
    object: 'migration_metadata',
    viewGroup: 'sys_database',
    objectSlug: 'migration-metadata',
    moduleGroup: 'sys',
    viewSortOrder: '16',
    moduleSortOrder: '5',
    objectSortOrder: '14',
  },
  {
    view: 'migrations',
    module: 'database',
    object: 'migration_tag',
    viewGroup: 'sys_database',
    objectSlug: 'migration-tags',
    moduleGroup: 'sys',
    viewSortOrder: '16',
    moduleSortOrder: '5',
    objectSortOrder: '13',
  },
  {
    view: 'migrations',
    module: 'database',
    object: 'migration_rolback',
    viewGroup: 'sys_database',
    objectSlug: 'migration-rolbacks',
    moduleGroup: 'sys',
    viewSortOrder: '16',
    moduleSortOrder: '5',
    objectSortOrder: '12',
  },
  {
    view: 'migrations',
    module: 'database',
    object: 'migration_script',
    viewGroup: 'sys_database',
    objectSlug: 'migration-scripts',
    moduleGroup: 'sys',
    viewSortOrder: '16',
    moduleSortOrder: '5',
    objectSortOrder: '11',
  },
  {
    view: 'migrations',
    module: 'database',
    object: 'migration_category',
    viewGroup: 'sys_database',
    objectSlug: 'migration-categories',
    moduleGroup: 'sys',
    viewSortOrder: '16',
    moduleSortOrder: '5',
    objectSortOrder: '10',
  },
  {
    view: 'migrations',
    module: 'database',
    object: 'migration',
    viewGroup: 'sys_database',
    objectSlug: 'migrations',
    moduleGroup: 'sys',
    viewSortOrder: '16',
    moduleSortOrder: '5',
    objectSortOrder: '9',
  },
  {
    view: 'migration-categories',
    module: 'database',
    object: 'migration_category',
    viewGroup: 'sys_database',
    objectSlug: 'migration-categories',
    moduleGroup: 'sys',
    viewSortOrder: '17',
    moduleSortOrder: '5',
    objectSortOrder: '10',
  },
  {
    view: 'migration-scripts',
    module: 'database',
    object: 'migration_script',
    viewGroup: 'sys_database',
    objectSlug: 'migration-scripts',
    moduleGroup: 'sys',
    viewSortOrder: '18',
    moduleSortOrder: '5',
    objectSortOrder: '11',
  },
  {
    view: 'migration-rollbacks',
    module: 'database',
    object: 'migration_rolback',
    viewGroup: 'sys_database',
    objectSlug: 'migration-rolbacks',
    moduleGroup: 'sys',
    viewSortOrder: '19',
    moduleSortOrder: '5',
    objectSortOrder: '12',
  },
  {
    view: 'migration-tags',
    module: 'database',
    object: 'migration_tag',
    viewGroup: 'sys_database',
    objectSlug: 'migration-tags',
    moduleGroup: 'sys',
    viewSortOrder: '20',
    moduleSortOrder: '5',
    objectSortOrder: '13',
  },
  {
    view: 'configs',
    module: 'sys-setting',
    object: 'config',
    viewGroup: 'sys_setting',
    objectSlug: 'configs',
    moduleGroup: 'setting',
    viewSortOrder: '28',
    moduleSortOrder: '28',
    objectSortOrder: '16',
  },
  {
    view: 'users',
    module: 'iam',
    object: 'permission',
    viewGroup: 'app_iam',
    objectSlug: 'permissions',
    moduleGroup: 'app',
    viewSortOrder: '35',
    moduleSortOrder: '10',
    objectSortOrder: '22',
  },
  {
    view: 'users',
    module: 'iam',
    object: 'policy',
    viewGroup: 'app_iam',
    objectSlug: 'policies',
    moduleGroup: 'app',
    viewSortOrder: '35',
    moduleSortOrder: '10',
    objectSortOrder: '21',
  },
  {
    view: 'users',
    module: 'iam',
    object: 'role',
    viewGroup: 'app_iam',
    objectSlug: 'roles',
    moduleGroup: 'app',
    viewSortOrder: '35',
    moduleSortOrder: '10',
    objectSortOrder: '20',
  },
  {
    view: 'users',
    module: 'iam',
    object: 'group',
    viewGroup: 'app_iam',
    objectSlug: 'groups',
    moduleGroup: 'app',
    viewSortOrder: '35',
    moduleSortOrder: '10',
    objectSortOrder: '19',
  },
  {
    view: 'users',
    module: 'iam',
    object: 'user',
    viewGroup: 'app_iam',
    objectSlug: 'users',
    moduleGroup: 'app',
    viewSortOrder: '35',
    moduleSortOrder: '10',
    objectSortOrder: '18',
  },
  {
    view: 'groups',
    module: 'iam',
    object: 'group',
    viewGroup: 'app_iam',
    objectSlug: 'groups',
    moduleGroup: 'app',
    viewSortOrder: '36',
    moduleSortOrder: '10',
    objectSortOrder: '19',
  },
  {
    view: 'roles',
    module: 'iam',
    object: 'role',
    viewGroup: 'app_iam',
    objectSlug: 'roles',
    moduleGroup: 'app',
    viewSortOrder: '37',
    moduleSortOrder: '10',
    objectSortOrder: '20',
  },
  {
    view: 'policies',
    module: 'iam',
    object: 'policy',
    viewGroup: 'app_iam',
    objectSlug: 'policies',
    moduleGroup: 'app',
    viewSortOrder: '38',
    moduleSortOrder: '10',
    objectSortOrder: '21',
  },
  {
    view: 'permissions',
    module: 'iam',
    object: 'permission',
    viewGroup: 'app_iam',
    objectSlug: 'permissions',
    moduleGroup: 'app',
    viewSortOrder: '39',
    moduleSortOrder: '10',
    objectSortOrder: '22',
  },
  {
    view: 'customers',
    module: 'visitor',
    object: 'customer',
    viewGroup: 'app_visitor',
    objectSlug: 'customers',
    moduleGroup: 'app',
    viewSortOrder: '46',
    moduleSortOrder: '12',
    objectSortOrder: '24',
  },
  {
    view: 'customer-groups',
    module: 'visitor',
    object: 'customer_group',
    viewGroup: 'app_visitor',
    objectSlug: 'customer-groups',
    moduleGroup: 'app',
    viewSortOrder: '47',
    moduleSortOrder: '12',
    objectSortOrder: '25',
  },
];

const dataMapper = new DataMapper();
const dataStructure: DataStructure = dataMapper.mapDataToDataStructure(data);
console.log(dataStructure);
*/

/* type DataMapping = {
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
};

enum DataType {
  MODULE = 'module',
  VIEW = 'view',
  OBJECT = 'object',
  FIELD = 'field',
}

type DataStructure = {
  modules: Record<string, ModuleData>;
  views: Record<string, Record<string, ViewData>>;
  objects: Record<string, Record<string, ObjectData>>;
};

type ModuleData = {
  name: string;
  group: string;
  type: DataType.MODULE;
  sortOrder: string | null;
};

type ViewData = {
  name: string;
  group: string;
  type: DataType.VIEW;
  sortOrder: string | null;
};

type ObjectData = {
  name: string;
  slug: string;
  type: DataType.OBJECT;
  sortOrder: string | null;
};

export class DataMapper {
  private dataStructure: DataStructure;

  constructor() {
    this.dataStructure = {
      modules: {},
      views: {},
      objects: {},
    };
  }

  private mapData(data: DataMapping): void {
    const { modules, views, objects } = this.dataStructure;
    const moduleData: ModuleData = {
      name: data.moduleName || data.module,
      group: data.moduleGroup,
      type: DataType.MODULE,
      sortOrder: data.moduleSortOrder,
    };

    const viewData: ViewData = {
      name: data.viewName || data.view,
      group: data.viewGroup,
      type: DataType.VIEW,
      sortOrder: data.viewSortOrder,
    };

    const objectData: ObjectData = {
      name: data.object,
      slug: data.objectSlug || data.object,
      type: DataType.OBJECT,
      sortOrder: data.objectSortOrder,
    };

    if (!modules[data.module]) {
      modules[data.module] = { ...moduleData };
    }
    if (!views[data.module]) {
      views[data.module] = {};
    }
    if (!views[data.module][data.view]) {
      views[data.module][data.view] = { ...viewData };
    }
    if (!objects[data.view]) {
      objects[data.view] = {};
    }
    if (!objects[data.view][data.object]) {
      objects[data.view][data.object] = { ...objectData };
    }
  }

  public mapDataToDataStructure(dataList: DataMapping[]): DataStructure {
    dataList.forEach((data) => {
      this.mapData(data);
    });

    return this.dataStructure;
  }
}
 */
