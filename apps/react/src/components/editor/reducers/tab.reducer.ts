export const tabReducer = (type?: string) => {
  switch (type) {
    case 'field':
      return [
        {
          name: 'content',
          title: "Content",
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
          title: "Design",
          data: []
        },
        {
          name: 'setting',
          title: "Setting",
          data: []
        }
      ]
    default:
      return [];
  }
}