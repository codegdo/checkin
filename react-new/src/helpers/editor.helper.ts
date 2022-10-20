class EditorHelper {
  getField({ id, className, label, description, isRequired, style }) {

    const classId = `f-${id}`;

    return {
      classId,
      type: 'field',
      values: {
        className, label, description, isRequired, style
      },
      keys: [
        {
          key: 'content',
          data: [
            {
              className: `.${classId} .label`,
              name: 'label',
              type: 'text',
              style: {
                fontSize: ''
              }
            },
            {
              className: `.${classId} .description`,
              name: 'description',
              type: 'text',
              style: {
                fontSize: ''
              }
            }
          ]
        },
        {
          key: 'design',
          data: [
            {
              className: `.${classId}`,
              name: 'background',
              style: {
                backgroundColor: ''
              }
            },
            {
              className: `.${classId}`,
              name: 'color',
              style: {}
            }
          ]
        },
        {
          key: 'setting',
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