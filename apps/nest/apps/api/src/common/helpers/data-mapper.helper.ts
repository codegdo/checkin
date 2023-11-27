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
  actions: Record<string, string[]>;
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

  action: string | null;
};

export class DataMapper {
  private dataStructure: DataStructure;

  constructor() {
    this.dataStructure = {
      modules: [],
      views: {},
      objects: {},
      actions: {},
    };
  }

  private addModule(data: DataMapping): void {
    const { module, moduleName, moduleGroup, moduleSortOrder } = data;
    if (!module) return;

    // Check if the module already exists in the array
    const existingModule = this.dataStructure.modules.some(
      (m) => m.name === module,
    );

    if (!existingModule) {
      const moduleData: ModuleData = {
        name: moduleName || module,
        group: moduleGroup,
        type: DataType.MODULE,
        sortOrder: moduleSortOrder,
      };
      this.dataStructure.modules.push(moduleData);
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
        type: DataType.VIEW,
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
        type: DataType.OBJECT,
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
    this.dataStructure.modules = this.sortItemsBySortOrder(
      this.dataStructure.modules,
    );

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

/*
// Sample data
const data: DataMapping[] = [
    {
      "view": "migrations",
      "action": "createNewMigrationScript",
      "module": "manage",
      "object": "migration",
      "viewGroup": "sys_database",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "9"
    },
    {
      "view": "migrations",
      "action": "getMigrationScriptById",
      "module": "manage",
      "object": "migration",
      "viewGroup": "sys_database",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "9"
    },
    {
      "view": "migrations",
      "action": "getAllMigrationScripts",
      "module": "manage",
      "object": "migration",
      "viewGroup": "sys_database",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "9"
    },
    {
      "view": "migrations",
      "action": "createNewMigrationCategory",
      "module": "manage",
      "object": "migration",
      "viewGroup": "sys_database",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "9"
    },
    {
      "view": "migrations",
      "action": "getMigrationCategoryById",
      "module": "manage",
      "object": "migration",
      "viewGroup": "sys_database",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "9"
    },
    {
      "view": "migrations",
      "action": "getAllMigrationCategories",
      "module": "manage",
      "object": "migration",
      "viewGroup": "sys_database",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "9"
    },
    {
      "view": "migrations",
      "action": "migrationRollbackById",
      "module": "manage",
      "object": "migration",
      "viewGroup": "sys_database",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "9"
    },
    {
      "view": "migrations",
      "action": "migrationRunById",
      "module": "manage",
      "object": "migration",
      "viewGroup": "sys_database",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "9"
    },
    {
      "view": "migrations",
      "action": "createNewMigration",
      "module": "manage",
      "object": "migration",
      "viewGroup": "sys_database",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "9"
    },
    {
      "view": "migrations",
      "action": "getRollbacksForMigration",
      "module": "manage",
      "object": "migration",
      "viewGroup": "sys_database",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "9"
    },
    {
      "view": "migrations",
      "action": "getScriptsForMigration",
      "module": "manage",
      "object": "migration",
      "viewGroup": "sys_database",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "9"
    },
    {
      "view": "migrations",
      "action": "getMigrationById",
      "module": "manage",
      "object": "migration",
      "viewGroup": "sys_database",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "9"
    },
    {
      "view": "migrations",
      "action": "getAllMigrations",
      "module": "manage",
      "object": "migration",
      "viewGroup": "sys_database",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "9"
    },
    {
      "view": "migrations",
      "action": "assignScriptsToMigration",
      "module": "manage",
      "object": "migration",
      "viewGroup": "sys_database",
      "objectSlug": "migrations",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "9"
    },
    {
      "view": "migrations",
      "action": "createNewMigrationScript",
      "module": "manage",
      "object": "migration_category",
      "viewGroup": "sys_database",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "getMigrationScriptById",
      "module": "manage",
      "object": "migration_category",
      "viewGroup": "sys_database",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "getAllMigrationScripts",
      "module": "manage",
      "object": "migration_category",
      "viewGroup": "sys_database",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "createNewMigrationCategory",
      "module": "manage",
      "object": "migration_category",
      "viewGroup": "sys_database",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "getMigrationCategoryById",
      "module": "manage",
      "object": "migration_category",
      "viewGroup": "sys_database",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "getAllMigrationCategories",
      "module": "manage",
      "object": "migration_category",
      "viewGroup": "sys_database",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "migrationRollbackById",
      "module": "manage",
      "object": "migration_category",
      "viewGroup": "sys_database",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "migrationRunById",
      "module": "manage",
      "object": "migration_category",
      "viewGroup": "sys_database",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "createNewMigration",
      "module": "manage",
      "object": "migration_category",
      "viewGroup": "sys_database",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "getRollbacksForMigration",
      "module": "manage",
      "object": "migration_category",
      "viewGroup": "sys_database",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "getScriptsForMigration",
      "module": "manage",
      "object": "migration_category",
      "viewGroup": "sys_database",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "getMigrationById",
      "module": "manage",
      "object": "migration_category",
      "viewGroup": "sys_database",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "getAllMigrations",
      "module": "manage",
      "object": "migration_category",
      "viewGroup": "sys_database",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "assignScriptsToMigration",
      "module": "manage",
      "object": "migration_category",
      "viewGroup": "sys_database",
      "objectSlug": "migration-categories",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "10"
    },
    {
      "view": "migrations",
      "action": "createNewMigrationScript",
      "module": "manage",
      "object": "migration_script",
      "viewGroup": "sys_database",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "getMigrationScriptById",
      "module": "manage",
      "object": "migration_script",
      "viewGroup": "sys_database",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "getAllMigrationScripts",
      "module": "manage",
      "object": "migration_script",
      "viewGroup": "sys_database",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "createNewMigrationCategory",
      "module": "manage",
      "object": "migration_script",
      "viewGroup": "sys_database",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "getMigrationCategoryById",
      "module": "manage",
      "object": "migration_script",
      "viewGroup": "sys_database",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "getAllMigrationCategories",
      "module": "manage",
      "object": "migration_script",
      "viewGroup": "sys_database",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "migrationRollbackById",
      "module": "manage",
      "object": "migration_script",
      "viewGroup": "sys_database",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "migrationRunById",
      "module": "manage",
      "object": "migration_script",
      "viewGroup": "sys_database",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "createNewMigration",
      "module": "manage",
      "object": "migration_script",
      "viewGroup": "sys_database",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "getRollbacksForMigration",
      "module": "manage",
      "object": "migration_script",
      "viewGroup": "sys_database",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "getScriptsForMigration",
      "module": "manage",
      "object": "migration_script",
      "viewGroup": "sys_database",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "getMigrationById",
      "module": "manage",
      "object": "migration_script",
      "viewGroup": "sys_database",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "getAllMigrations",
      "module": "manage",
      "object": "migration_script",
      "viewGroup": "sys_database",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "assignScriptsToMigration",
      "module": "manage",
      "object": "migration_script",
      "viewGroup": "sys_database",
      "objectSlug": "migration-scripts",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "11"
    },
    {
      "view": "migrations",
      "action": "createNewMigrationScript",
      "module": "manage",
      "object": "migration_rolback",
      "viewGroup": "sys_database",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "getMigrationScriptById",
      "module": "manage",
      "object": "migration_rolback",
      "viewGroup": "sys_database",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "getAllMigrationScripts",
      "module": "manage",
      "object": "migration_rolback",
      "viewGroup": "sys_database",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "createNewMigrationCategory",
      "module": "manage",
      "object": "migration_rolback",
      "viewGroup": "sys_database",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "getMigrationCategoryById",
      "module": "manage",
      "object": "migration_rolback",
      "viewGroup": "sys_database",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "getAllMigrationCategories",
      "module": "manage",
      "object": "migration_rolback",
      "viewGroup": "sys_database",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "migrationRollbackById",
      "module": "manage",
      "object": "migration_rolback",
      "viewGroup": "sys_database",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "migrationRunById",
      "module": "manage",
      "object": "migration_rolback",
      "viewGroup": "sys_database",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "createNewMigration",
      "module": "manage",
      "object": "migration_rolback",
      "viewGroup": "sys_database",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "getRollbacksForMigration",
      "module": "manage",
      "object": "migration_rolback",
      "viewGroup": "sys_database",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "getScriptsForMigration",
      "module": "manage",
      "object": "migration_rolback",
      "viewGroup": "sys_database",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "getMigrationById",
      "module": "manage",
      "object": "migration_rolback",
      "viewGroup": "sys_database",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "getAllMigrations",
      "module": "manage",
      "object": "migration_rolback",
      "viewGroup": "sys_database",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "assignScriptsToMigration",
      "module": "manage",
      "object": "migration_rolback",
      "viewGroup": "sys_database",
      "objectSlug": "migration-rolbacks",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "12"
    },
    {
      "view": "migrations",
      "action": "createNewMigrationScript",
      "module": "manage",
      "object": "migration_tag",
      "viewGroup": "sys_database",
      "objectSlug": "migration-tags",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "13"
    },
    {
      "view": "migrations",
      "action": "getMigrationScriptById",
      "module": "manage",
      "object": "migration_tag",
      "viewGroup": "sys_database",
      "objectSlug": "migration-tags",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "13"
    },
    {
      "view": "migrations",
      "action": "getAllMigrationScripts",
      "module": "manage",
      "object": "migration_tag",
      "viewGroup": "sys_database",
      "objectSlug": "migration-tags",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "13"
    },
    {
      "view": "migrations",
      "action": "createNewMigrationCategory",
      "module": "manage",
      "object": "migration_tag",
      "viewGroup": "sys_database",
      "objectSlug": "migration-tags",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "13"
    },
    {
      "view": "migrations",
      "action": "getMigrationCategoryById",
      "module": "manage",
      "object": "migration_tag",
      "viewGroup": "sys_database",
      "objectSlug": "migration-tags",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "13"
    },
    {
      "view": "migrations",
      "action": "getAllMigrationCategories",
      "module": "manage",
      "object": "migration_tag",
      "viewGroup": "sys_database",
      "objectSlug": "migration-tags",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "13"
    },
    {
      "view": "migrations",
      "action": "migrationRollbackById",
      "module": "manage",
      "object": "migration_tag",
      "viewGroup": "sys_database",
      "objectSlug": "migration-tags",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "13"
    },
    {
      "view": "migrations",
      "action": "migrationRunById",
      "module": "manage",
      "object": "migration_tag",
      "viewGroup": "sys_database",
      "objectSlug": "migration-tags",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "13"
    },
    {
      "view": "migrations",
      "action": "createNewMigration",
      "module": "manage",
      "object": "migration_tag",
      "viewGroup": "sys_database",
      "objectSlug": "migration-tags",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "13"
    },
    {
      "view": "migrations",
      "action": "getRollbacksForMigration",
      "module": "manage",
      "object": "migration_tag",
      "viewGroup": "sys_database",
      "objectSlug": "migration-tags",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "13"
    },
    {
      "view": "migrations",
      "action": "getScriptsForMigration",
      "module": "manage",
      "object": "migration_tag",
      "viewGroup": "sys_database",
      "objectSlug": "migration-tags",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "13"
    },
    {
      "view": "migrations",
      "action": "getMigrationById",
      "module": "manage",
      "object": "migration_tag",
      "viewGroup": "sys_database",
      "objectSlug": "migration-tags",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "13"
    },
    {
      "view": "migrations",
      "action": "getAllMigrations",
      "module": "manage",
      "object": "migration_tag",
      "viewGroup": "sys_database",
      "objectSlug": "migration-tags",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "13"
    },
    {
      "view": "migrations",
      "action": "assignScriptsToMigration",
      "module": "manage",
      "object": "migration_tag",
      "viewGroup": "sys_database",
      "objectSlug": "migration-tags",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "13"
    },
    {
      "view": "migrations",
      "action": "createNewMigrationScript",
      "module": "manage",
      "object": "migration_metadata",
      "viewGroup": "sys_database",
      "objectSlug": "migration-metadata",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "14"
    },
    {
      "view": "migrations",
      "action": "getMigrationScriptById",
      "module": "manage",
      "object": "migration_metadata",
      "viewGroup": "sys_database",
      "objectSlug": "migration-metadata",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "14"
    },
    {
      "view": "migrations",
      "action": "getAllMigrationScripts",
      "module": "manage",
      "object": "migration_metadata",
      "viewGroup": "sys_database",
      "objectSlug": "migration-metadata",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "14"
    },
    {
      "view": "migrations",
      "action": "createNewMigrationCategory",
      "module": "manage",
      "object": "migration_metadata",
      "viewGroup": "sys_database",
      "objectSlug": "migration-metadata",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "14"
    },
    {
      "view": "migrations",
      "action": "getMigrationCategoryById",
      "module": "manage",
      "object": "migration_metadata",
      "viewGroup": "sys_database",
      "objectSlug": "migration-metadata",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "14"
    },
    {
      "view": "migrations",
      "action": "getAllMigrationCategories",
      "module": "manage",
      "object": "migration_metadata",
      "viewGroup": "sys_database",
      "objectSlug": "migration-metadata",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "14"
    },
    {
      "view": "migrations",
      "action": "migrationRollbackById",
      "module": "manage",
      "object": "migration_metadata",
      "viewGroup": "sys_database",
      "objectSlug": "migration-metadata",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "14"
    },
    {
      "view": "migrations",
      "action": "migrationRunById",
      "module": "manage",
      "object": "migration_metadata",
      "viewGroup": "sys_database",
      "objectSlug": "migration-metadata",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "14"
    },
    {
      "view": "migrations",
      "action": "createNewMigration",
      "module": "manage",
      "object": "migration_metadata",
      "viewGroup": "sys_database",
      "objectSlug": "migration-metadata",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "14"
    },
    {
      "view": "migrations",
      "action": "getRollbacksForMigration",
      "module": "manage",
      "object": "migration_metadata",
      "viewGroup": "sys_database",
      "objectSlug": "migration-metadata",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "14"
    },
    {
      "view": "migrations",
      "action": "getScriptsForMigration",
      "module": "manage",
      "object": "migration_metadata",
      "viewGroup": "sys_database",
      "objectSlug": "migration-metadata",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "14"
    },
    {
      "view": "migrations",
      "action": "getMigrationById",
      "module": "manage",
      "object": "migration_metadata",
      "viewGroup": "sys_database",
      "objectSlug": "migration-metadata",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "14"
    },
    {
      "view": "migrations",
      "action": "getAllMigrations",
      "module": "manage",
      "object": "migration_metadata",
      "viewGroup": "sys_database",
      "objectSlug": "migration-metadata",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "14"
    },
    {
      "view": "migrations",
      "action": "assignScriptsToMigration",
      "module": "manage",
      "object": "migration_metadata",
      "viewGroup": "sys_database",
      "objectSlug": "migration-metadata",
      "moduleGroup": "sys",
      "viewSortOrder": "12",
      "moduleSortOrder": "5",
      "objectSortOrder": "14"
    },
    {
      "view": "accounts",
      "action": null,
      "module": "client",
      "object": "account",
      "viewGroup": "sys_client",
      "objectSlug": "accounts",
      "moduleGroup": "sys",
      "viewSortOrder": "9",
      "moduleSortOrder": "4",
      "objectSortOrder": "3"
    },
    {
      "view": "accounts",
      "action": null,
      "module": "client",
      "object": "company",
      "viewGroup": "sys_client",
      "objectSlug": "companies",
      "moduleGroup": "sys",
      "viewSortOrder": "9",
      "moduleSortOrder": "4",
      "objectSortOrder": "4"
    },
    {
      "view": "accounts",
      "action": null,
      "module": "client",
      "object": "subscription",
      "viewGroup": "sys_client",
      "objectSlug": "subscriptions",
      "moduleGroup": "sys",
      "viewSortOrder": "9",
      "moduleSortOrder": "4",
      "objectSortOrder": "5"
    },
    {
      "view": "accounts",
      "action": null,
      "module": "client",
      "object": "payment",
      "viewGroup": "sys_client",
      "objectSlug": "payments",
      "moduleGroup": "sys",
      "viewSortOrder": "9",
      "moduleSortOrder": "4",
      "objectSortOrder": "6"
    },
    {
      "view": "accounts",
      "action": null,
      "module": "client",
      "object": "invoice",
      "viewGroup": "sys_client",
      "objectSlug": "invoices",
      "moduleGroup": "sys",
      "viewSortOrder": "9",
      "moduleSortOrder": "4",
      "objectSortOrder": "7"
    },
    {
      "view": "metrics",
      "action": "getAllMetric",
      "module": "monitor",
      "object": "metric",
      "viewGroup": "sys_monitor",
      "objectSlug": "metrics",
      "moduleGroup": "sys",
      "viewSortOrder": "2",
      "moduleSortOrder": "2",
      "objectSortOrder": "1"
    },
    {
      "view": "customers",
      "action": null,
      "module": "visitor",
      "object": "customer",
      "viewGroup": "app_visitor",
      "objectSlug": "customers",
      "moduleGroup": "app",
      "viewSortOrder": "37",
      "moduleSortOrder": "12",
      "objectSortOrder": "24"
    },
    {
      "view": "customer-groups",
      "action": null,
      "module": "visitor",
      "object": "customer_group",
      "viewGroup": "app_visitor",
      "objectSlug": "customer-groups",
      "moduleGroup": "app",
      "viewSortOrder": "38",
      "moduleSortOrder": "12",
      "objectSortOrder": "25"
    },
    {
      "view": "users",
      "action": null,
      "module": "iam",
      "object": "user",
      "viewGroup": "app_iam",
      "objectSlug": "users",
      "moduleGroup": "app",
      "viewSortOrder": "26",
      "moduleSortOrder": "10",
      "objectSortOrder": "18"
    },
    {
      "view": "users",
      "action": null,
      "module": "iam",
      "object": "group",
      "viewGroup": "app_iam",
      "objectSlug": "groups",
      "moduleGroup": "app",
      "viewSortOrder": "26",
      "moduleSortOrder": "10",
      "objectSortOrder": "19"
    },
    {
      "view": "users",
      "action": null,
      "module": "iam",
      "object": "role",
      "viewGroup": "app_iam",
      "objectSlug": "roles",
      "moduleGroup": "app",
      "viewSortOrder": "26",
      "moduleSortOrder": "10",
      "objectSortOrder": "20"
    },
    {
      "view": "users",
      "action": null,
      "module": "iam",
      "object": "policy",
      "viewGroup": "app_iam",
      "objectSlug": "policies",
      "moduleGroup": "app",
      "viewSortOrder": "26",
      "moduleSortOrder": "10",
      "objectSortOrder": "21"
    },
    {
      "view": "users",
      "action": null,
      "module": "iam",
      "object": "permission",
      "viewGroup": "app_iam",
      "objectSlug": "permissions",
      "moduleGroup": "app",
      "viewSortOrder": "26",
      "moduleSortOrder": "10",
      "objectSortOrder": "22"
    },
    {
      "view": "groups",
      "action": null,
      "module": "iam",
      "object": "group",
      "viewGroup": "app_iam",
      "objectSlug": "groups",
      "moduleGroup": "app",
      "viewSortOrder": "27",
      "moduleSortOrder": "10",
      "objectSortOrder": "19"
    },
    {
      "view": "roles",
      "action": null,
      "module": "iam",
      "object": "role",
      "viewGroup": "app_iam",
      "objectSlug": "roles",
      "moduleGroup": "app",
      "viewSortOrder": "28",
      "moduleSortOrder": "10",
      "objectSortOrder": "20"
    },
    {
      "view": "policies",
      "action": null,
      "module": "iam",
      "object": "policy",
      "viewGroup": "app_iam",
      "objectSlug": "policies",
      "moduleGroup": "app",
      "viewSortOrder": "29",
      "moduleSortOrder": "10",
      "objectSortOrder": "21"
    },
    {
      "view": "permissions",
      "action": null,
      "module": "iam",
      "object": "permission",
      "viewGroup": "app_iam",
      "objectSlug": "permissions",
      "moduleGroup": "app",
      "viewSortOrder": "30",
      "moduleSortOrder": "10",
      "objectSortOrder": "22"
    },
    {
      "view": "configs",
      "action": null,
      "module": "sys-setting",
      "object": "config",
      "viewGroup": "sys_setting",
      "objectSlug": "configs",
      "moduleGroup": "setting",
      "viewSortOrder": "19",
      "moduleSortOrder": "28",
      "objectSortOrder": "16"
    }
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
