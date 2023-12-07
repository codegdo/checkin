import { Controller, Get, Param } from '@nestjs/common';

@Controller()
export class FormController {
  @Get()
  async getAllForms() {
    return [
      {
        id: 1,
        name: 'signup',
        title: 'Signup Form',
        description: 'Sample Form',
        data: [],
        version: 1,
      },
      {
        id: 2,
        name: 'login',
        title: 'Login Form',
        description: 'Sample Form',
        data: [],
        version: 1,
      },
    ];
  }

  @Get(':id')
  async getFormById(@Param('id') id: number) {
    if (id == 1) {
      return {
        id: 1,
        name: 'signup',
        title: 'Signup Form',
        description: 'Sample Form',
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
        version: 1,
      };
    } else if (id == 2) {
      return {
        id: 2,
        name: 'login',
        title: 'Login Form',
        description: 'Sample Form',
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
        version: 1,
      };
    }
    return {};
  }
}
