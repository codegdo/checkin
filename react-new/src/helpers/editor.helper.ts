class EditorHelper {
  getField({ id, className, label, description, isRequired, style }) {

    return {
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
      data: [
        {
          type: 'content',
          data: [
            {
              name: 'label',
              type: 'text',

              style: ['fontSize'],

              tab: {
                name: 'style',
                type: 'tab',
              }
            },
            {
              name: 'description',
              type: 'text',
              style: ['fontSize']
            }
          ]
        },
        {
          type: 'design',
          data: [
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
          ]
        },
        {
          type: 'setting',
          data: [
            {
              name: 'field',
              type: 'checkbox',
              option: ['isRequired']
            }
          ]
        }
      ]
    }
  }

  getData(type: string) {
    const editor = {
      content: [],
      design: [],
      setting: []
    };

    switch (type) {
      case 'field':

        break;
    }

    return editor;
  }
}

export const editorHelper = new EditorHelper();