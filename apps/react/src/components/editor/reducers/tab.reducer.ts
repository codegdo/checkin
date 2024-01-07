export const tabReducer = (type?: string) => {
  switch (type) {
    case 'field':
      return [
        {
          name: 'content',
          title: 'Content',
          hasTabNav: true,
          data: [
            {
              name: 'title',
              title: 'Title',
              data: [
                {
                  type: 'text',
                  name: 'title',
                  title: 'Title',
                  data: null
                }
              ]
            },
            {
              name: 'description',
              title: 'Description',
              data: [
                {
                  type: 'text',
                  name: 'description',
                  title: 'Description',
                  data: null
                }
              ]
            }
          ],
        },
        {
          name: 'design',
          title: 'Design',
          hasTabNav: false,
          data: []
        },
        {
          name: 'setting',
          title: 'Setting',
          hasTabNav: false,
          data: []
        }
      ];
    case 'element':
      return [
        {
          name: 'content',
          title: 'Content',
          data: [
            {
              type: 'richtext',
              name: 'data',
              title: 'Data',
              data: null
            }
          ],
          hasTabNav: false
        }
      ];
    default:
      return [];
  }
}