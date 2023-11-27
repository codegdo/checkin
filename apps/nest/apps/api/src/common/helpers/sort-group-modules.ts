function sortAndGroupModules(modules) {
  // First, sort the objects by "sortOrder"
  const sortedModules = Object.values(modules).sort(
    (a, b) => Number(a.sortOrder) - Number(b.sortOrder),
  );

  // Next, group the sorted modules by their "group" property
  const groupedModules = sortedModules.reduce((result, module) => {
    const group = module.group;
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(module.name);
    return result;
  }, {});

  return groupedModules;
}

const m = {
  monitor: {
    name: 'monitor',
    group: 'sys',
    type: 'module',
    sortOrder: '1',
  },
  log: {
    name: 'log',
    group: 'sys',
    type: 'module',
    sortOrder: '6',
  },
  database: {
    name: 'database',
    group: 'sys',
    type: 'module',
    sortOrder: '5',
  },
  'sys-setting': {
    name: 'sys-setting',
    group: 'setting',
    type: 'module',
    sortOrder: '28',
  },
  iam: {
    name: 'iam',
    group: 'app',
    type: 'module',
    sortOrder: '10',
  },
  visitor: {
    name: 'visitor',
    group: 'app',
    type: 'module',
    sortOrder: '12',
  },
};

const groupedModules = sortAndGroupModules(m);
console.log(groupedModules);
