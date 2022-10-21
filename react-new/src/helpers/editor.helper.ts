class EditorHelper {
  getField({ id, className, label, description, isRequired, style }) {

    return {
      id,
      type: 'field',
      values: {
        className, label, description, isRequired,
        style: {
          field: {

          },
          label: {
            fontSize: ''
          },
          description: {
            fontSize: ''
          },
          ...style
        }
      },
      data: [
        {
          type: 'content',
          data: [
            {
              name: 'label',
              type: 'text',
              style: ['fontSize']
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
              name: '',
              option: {
                isRequired
              }
            }
          ]
        }
      ]
    }
  }
}

export const editorHelper = new EditorHelper();