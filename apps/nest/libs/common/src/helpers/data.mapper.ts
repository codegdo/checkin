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