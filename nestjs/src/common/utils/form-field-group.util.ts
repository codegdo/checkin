var arr = [
  {
    form_id: 1,
    form_name: 'login',
    form_label: 'Login',
    field_id: 1,
    field_name: 'username',
    field_label: 'Username',
    field_data: null,
    field_map: 'sec.user.username',
    field_lookup: null
  },
  {
    form_id: 1,
    form_name: 'login',
    form_label: 'Login',
    field_id: 2,
    field_name: 'password',
    field_label: 'Password',
    field_data: null,
    field_map: 'sec.user.password',
    field_lookup: null
  }
];

var group = arr.reduce((a, i) => {
  let { form = {}, fields = [] } = a;

  let field = {};

  for (const key in i) {
    var [name, value] = key.split('_');

    if (name == 'form') {
      form = { ...form, [value]: i[key] }
    }

    if (name == 'field') {
      field = { ...field, [value]: i[key] }
    }
  }

  return {
    form: { ...form },
    fields: [...fields, field]
  }

}, {});

console.log(group);