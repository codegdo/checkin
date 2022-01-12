type ModuleViewObjectData = {
  module: string;
  mlabel: string;
  mgroup: string;

  view: string;
  vlabel: string;
  vgroup: string;

  object: string;
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

function mapPolicy(policy: ModuleViewObjectPolicy, i: ModuleViewObjectData) {
  const { modules = {}, views = {}, objects = {} } = policy;

  const m = {
    label: i.mlabel || i.module,
    group: i.mgroup,
    type: PermissionType.MODULE
  };
  const v = {
    type: PermissionType.VIEW
  };
  const o = {
    type: PermissionType.OBJECT
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

function mapNav(nav: ModuleViewObjectNav, i: ModuleViewObjectData) {
  const { modules = [], views = [], objects = {} } = nav;

  const m: string[] = [...modules];
  const v: string[][] = [...views];
  const o = { ...objects, [i.view]: [...objects[i.view] || [], i.object] };

  if (m.indexOf(i.module) === -1) {
    v.push([]);
    m.push(i.module);
  }

  if (v[m.indexOf(i.module)].indexOf(i.view) === -1) {
    v[m.indexOf(i.module)].push(i.view);
  }

  return {
    modules: [...m],
    views: [...v],
    objects: { ...o }
  }
}

export const moduleViewObjectGroup = (list: ModuleViewObjectData[] = []) => {

  return list.reduce((a, i: ModuleViewObjectData) => {

    const { nav = {}, policy = {} }: ModuleViewObjectReturn = a;
    const _policy = mapPolicy(policy, i);
    const _nav = mapNav(nav, i);

    return {
      nav: { ..._nav },
      policy: { ..._policy }
    };

  }, {});
};