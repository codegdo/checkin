export const moduleViewObjectGroup = ({ values }) => {
  return values.reduce((value, i) => {

    const { modules, views, objects } = value;

    const m = { ...modules, [i.modules]: {} };
    const v = { ...views, [i.modules]: { ...views[i.modules], [i.views]: {} } };
    const o = { ...objects, [i.views]: { ...objects[i.views], [i.objects]: {} } };

    return { modules: { ...m }, views: { ...v }, objects: { ...o } };

  }, { modules: {}, views: {}, objects: {} });
};