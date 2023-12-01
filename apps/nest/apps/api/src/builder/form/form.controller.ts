import { Controller, Get } from '@nestjs/common';

@Controller()
export class FormController {
  @Get()
  async getAllForms() {
    return {
      formId: 1,
      data: [
        {
          id: 1,
          name: 'block',
          type: 'div',
          dataType: 'block',
          data: [],
          parentId: null,
          position: 0,
        },
        {
          id: 2,
          name: 'field',
          type: 'text',
          dataType: 'field',
          data: null,
          parentId: 1,
          position: 1,
        },
        {
          id: 3,
          name: 'field',
          type: 'text',
          dataType: 'field',
          data: null,
          parentId: null,
          position: 2,
        },
        {
          id: 4,
          name: 'block',
          type: 'div',
          dataType: 'block',
          data: [],
          parentId: null,
          position: 3,
        },
        {
          id: 5,
          name: 'field',
          type: 'text',
          dataType: 'field',
          data: null,
          parentId: 4,
          position: 4,
        },
      ],
    };
  }
}
