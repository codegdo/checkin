type ModuleViewObjectData = {
  module: string;
  moduleTitle: string;
  moduleGroup: string;

  view: string;
  viewTitle: string;
  viewGroup: string;

  object: string;
  objectTitle: string;
}

type ModuleViewObjectReturn = {
  nav?: ModuleViewObjectNav;
  policy?: ModuleViewObjectPolicy;
}

type ModuleViewObjectPolicy = {
  modules?: {};
  views?: {};
  objects?: {};
}

type ModuleViewObjectNav = {
  modules?: [];
  views?: string[][];
  objects?: {};
}

enum PermissionType {
  MODULE = 'module',
  VIEW = 'view',
  OBJECT = 'object',
  FIELD = 'field'
}

/* function mapPolicy(policy: ModuleViewObjectPolicy, i: ModuleViewObjectData) {
  const { modules = {}, views = {}, objects = {} } = policy;

  const m = {
    label: i.moduleLabel || i.module,
    group: i.moduleGroup,
    type: PermissionType.MODULE,
    access: 'all'
  };
  const v = {
    label: i.viewLabel || i.view,
    group: i.viewGroup,
    type: PermissionType.VIEW,
    access: 'all'
  };
  const o = {
    type: PermissionType.OBJECT,
    access: 'all'
  };

  return {
    modules: {
      ...modules,
      [i.module]: { ...m }
    },
    views: {
      ...views,
      [i.module]: {
        ...views[i.module],
        [i.view]: { ...v }
      }
    },
    objects: {
      ...objects,
      [i.view]: {
        ...objects[i.view],
        [i.object]: { ...o }
      }
    }
  }
} */

function mapNav(nav: ModuleViewObjectPolicy, i: ModuleViewObjectData) {
  const { modules = {}, views = {}, objects = {} } = nav;

  const m = {
    //name: i.module,
    title: i.moduleTitle || i.module,
    group: i.moduleGroup,
    //type: PermissionType.MODULE
  };
  const v = {
    //name: i.view,
    title: i.viewTitle || i.view,
    group: i.viewGroup,
    //type: PermissionType.VIEW
  };
  const o = {
    name: i.object,
    title: i.objectTitle || i.object,
    //type: PermissionType.OBJECT
  };

  return {
    modules: {
      ...modules,
      [i.module]: { ...m }
    },
    views: {
      ...views,
      [i.module]: {
        ...views[i.module],
        [i.view]: { ...v }
      }
    },
    objects: {
      ...objects,
      [i.view]: {
        ...objects[i.view],
        [i.object]: { ...o }
      }
    }
  }
}

export const moduleViewObjectGroup = (list: ModuleViewObjectData[] = []): any => {

  return list.reduce((a, i: ModuleViewObjectData) => {

    const nav = mapNav(a, i);

    return { ...nav };

  }, {});
};


/*
function mapNav(nav: ModuleViewObjectNav, i: ModuleViewObjectData) {
  const { modules = [], views = {}, objects = {} } = nav;

  const m: string[] = [...modules];
  //const v: string[][] = [...views];
  const v = { ...views, [i.module]: [...views[i.module] || [], i.view] };
  const o = { ...objects, [i.view]: [...objects[i.view] || [], i.object] };

  if (m.indexOf(i.module) === -1) {
    //v.push([]);
    m.push(i.module);
  }

  //if (v[m.indexOf(i.module)].indexOf(i.view) === -1) {
  //v[m.indexOf(i.module)].push(i.view);
  //}

  return {
    modules: [...m],
    views: { ...v },
    objects: { ...o }
  }
}
*/
/* export const moduleViewObjectGroup = (list: ModuleViewObjectData[] = []): any => {

  return list.reduce((a, i: ModuleViewObjectData) => {

    const { nav = {} }: ModuleViewObjectReturn = a;
    //const _policy = mapPolicy(policy, i);
    const _nav = mapNav(nav, i);

    return {
      nav: { ..._nav },
      //policy: { ..._policy }
    };

  }, {});
}; */