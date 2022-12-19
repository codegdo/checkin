class EditorHelper {
  getEditorBlock(data: any) {
    const values = {
      style: data.style,
    };
    const editor = {
      design: [],
      setting: [],
    };

    return { editor, values };
  }

  getEditorField(data: any) {
    const values = {
      label: data.label,
      description: data.description,
      style: data.style,
    };

    const editor = {
      content: [
        {
          name: 'panel',
          label: 'Label',
          type: 'div',
          dataType: 'block',
          data: [
            {
              name: 'label',
              label: 'Label',
              type: 'text',
              dataType: 'control',
            },
            {
              name: 'style.label.fontSize',
              label: 'Font Size',
              type: 'range',
              dataType: 'control',
            },
          ],
        },
        {
          name: 'panel',
          label: 'Description',
          type: 'div',
          dataType: 'block',
          data: [
            {
              name: 'description',
              label: 'Description',
              type: 'text',
              dataType: 'control',
            },
            {
              name: 'style.description.fontSize',
              label: 'Font Size',
              type: 'range',
              dataType: 'control',
            },
          ],
        },
      ],
      design: [
        {
          name: 'panel',
          label: 'Text',
          type: 'div',
          dataType: 'block',
          data: [
            {
              name: 'style.field.color',
              label: 'Color',
              type: 'color',
              dataType: 'control',
            },
            {
              name: 'style.field.background',
              label: 'Color',
              type: 'color',
              dataType: 'control',
            },
            {
              name: 'style.field.fontSize',
              label: 'Font Size',
              type: 'range',
              dataType: 'control',
            },
          ],
        },
        {
          name: 'panel',
          label: 'Background',
          type: 'div',
          dataType: 'block',
          data: [
            {
              name: 'style.field.background',
              label: 'Color',
              type: 'color',
              dataType: 'control',
            },
          ],
        },
      ],
      setting: [
        {
          name: 'field',
          type: 'checkbox',
          option: ['isRequired'],
        },
      ],
    };

    return { editor, values };
  }

  getEditorElement(data: any) {
    const values = {
      style: data.style,
    };

    const editor = {
      content: [],
      design: [],
      setting: [],
    };

    return { editor, values };
  }

  getEditor(data: any) {
    switch (data.dataType) {
      case 'block':
        return this.getEditorBlock(data);
      case 'field':
        return this.getEditorField(data);
      case 'element':
        return this.getEditorElement(data);
      default:
        return {};
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
