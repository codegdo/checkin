class EditorHelper {
  getField() {
    return {
      content: [
        {
          type: 'div',
          role: 'block',
          data: [
            {
              name: 'label',
              label: 'Label',
              type: 'text',
              role: 'control'
            },
            {
              name: 'style.label.fontSize',
              label: 'Font Size',
              type: 'range',
              role: 'control'
            }
          ]
        },
        {
          type: 'div',
          role: 'block',
          data: [
            {
              name: 'description',
              label: 'Description',
              type: 'text',
              role: 'control'
            },
            {
              name: 'style.description.fontSize',
              label: 'Font Size',
              type: 'range',
              role: 'control'
            }
          ]
        }
      ],
      design: [
        {
          name: 'field',
          type: 'text',
          style: ['color', 'fontSize']
        },
        {
          name: 'field',
          type: 'background',
          style: []
        },
        {
          name: 'field',
          type: 'border',
          style: []
        },
        {
          name: 'field',
          type: 'spacing',
          style: []
        }
      ],
      setting: [
        {
          name: 'field',
          type: 'checkbox',
          option: ['isRequired']
        }
      ]
    }
  }

  getData(type: string) {
    switch (type) {
      case 'field': return this.getField();
      default: return {};
    }
  }
}

export const editorHelper = new EditorHelper();


// id,
      // type: 'field',
      // values: {
      //   className, label, description, isRequired,
      //   style: {
      //     field: {

      //     },
      //     label: {
      //       fontSize: ''
      //     },
      //     description: {
      //       fontSize: ''
      //     },
      //     ...style
      //   }
      // },

/*
var style = {
field: {
fontSize: '10px'
},
label: {
fontSize: '5px;'
}
}

const keys = 'field.fontSize'.split('.');

const a = keys.reduce((s,k, i)=> {

if(s&&s[k] && keys.length - 1 == i) {
s[k] = '100px';
}
 
return s && s[k] || null;
}, style)

console.log(style);
*/