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
        updatedAt: '2023-10-27 10:11:57.878907',
      },
      {
        id: 2,
        name: 'login',
        title: 'Login Form',
        description: 'Sample Form',
        data: [],
        updatedAt: '2023-10-27 10:11:57.878907',
      },
    ];
  }

  @Get('/products')
  async getProduct() {
    //throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return {
      id: 5,
      name: 'role',
      title: 'Role',
      data: [
        {
          id: 6,
          name: 'roleId',
          title: 'Id',
          type: 'text',
          data: null,
          value: null,
          parentId: null,
          containerId: null,
          position: 0,
          required: true,
          readonly: true,
        },
        {
          id: 7,
          name: 'roleName',
          title: 'Name',
          type: 'text',
          data: null,
          value: null,
          parentId: null,
          containerId: null,
          position: 0,
          required: true,
          readonly: false,
        },
        {
          id: 8,
          name: 'roleDescription',
          title: 'Description',
          type: 'text',
          data: null,
          value: null,
          parentId: null,
          containerId: null,
          position: 0,
          required: false,
          readonly: false,
        },
      ],
      value: [
        { id: 6, value: '123', rowIndex: 0 },
        { id: 7, value: 'Admin', rowIndex: 0 },
        { id: 8, value: '', rowIndex: 0 },
        { id: 6, value: '124', rowIndex: 1 },
        { id: 7, value: 'User', rowIndex: 1 },
        { id: 8, value: '', rowIndex: 1 },
      ],
    };
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
            id: 'k-9c37c',
            name: 'block',
            type: 'block',
            dataType: 'block',
            data: [],
            parentId: null,
            position: 0,
          },
          {
            id: 3,
            name: 'username',
            title: 'Username',
            type: 'text',
            dataType: 'field',
            data: null,
            parentId: 'k-9c37c',
            position: 1,
          },
          {
            id: 4,
            name: 'password',
            title: 'Password',
            type: 'text',
            dataType: 'field',
            data: null,
            parentId: null,
            position: 2,
          },
          {
            id: 'y-b5e58',
            name: 'block',
            type: 'div',
            dataType: 'block',
            data: [],
            parentId: null,
            position: 3,
          },
          {
            id: 5,
            name: 'email',
            title: 'Email',
            type: 'text',
            dataType: 'field',
            data: null,
            parentId: 'y-b5e58',
            position: 4,
          },
        ],
        fields: [
          {
            id: 1,
            name: 'first_name',
            title: 'First Name',
            type: 'text',
            dataType: 'field',
            data: null,
            parentId: null,
            position: 0,
          },
          {
            id: 2,
            name: 'last_name',
            title: 'Last Name',
            type: 'text',
            dataType: 'field',
            data: null,
            parentId: null,
            position: null,
          },
          {
            id: 3,
            name: 'username',
            title: 'Username',
            type: 'text',
            dataType: 'field',
            data: null,
            parentId: null,
            position: null,
          },
          {
            id: 4,
            name: 'password',
            title: 'Password',
            type: 'text',
            dataType: 'field',
            data: null,
            parentId: null,
            position: null,
          },
          {
            id: 5,
            name: 'email',
            title: 'Email',
            type: 'text',
            dataType: 'field',
            data: null,
            parentId: null,
            position: null,
          },
        ],
        updatedAt: '2023-10-27 10:11:57.878907',
      };
    } else if (id == 2) {
      return {
        id: 2,
        name: 'login',
        title: 'Login Form',
        description: 'Sample Form',
        data: [
          {
            id: 'x-69feb',
            name: 'block',
            type: 'block',
            dataType: 'block',
            data: [],
            parentId: null,
            position: 0,
          },
          {
            id: 3,
            name: 'username',
            title: 'Username',
            type: 'text',
            dataType: 'field',
            data: null,
            parentId: 'x-69feb',
            position: 1,
          },
          {
            id: 'b-9d4aa',
            name: 'block',
            type: 'block',
            dataType: 'block',
            data: [],
            parentId: null,
            position: 2,
          },
          {
            id: 4,
            name: 'password',
            title: 'Password',
            type: 'text',
            dataType: 'field',
            data: null,
            parentId: 'b-9d4aa',
            position: 3,
          },
        ],
        fields: [
          {
            id: 1,
            name: 'first_name',
            title: 'First Name',
            type: 'text',
            dataType: 'field',
            data: null,
            parentId: null,
            position: 0,
          },
          {
            id: 2,
            name: 'last_name',
            title: 'Last Name',
            type: 'text',
            dataType: 'field',
            data: null,
            parentId: null,
            position: null,
          },
          {
            id: 3,
            name: 'username',
            title: 'Username',
            type: 'text',
            dataType: 'field',
            data: null,
            parentId: null,
            position: null,
          },
          {
            id: 4,
            name: 'password',
            title: 'Password',
            type: 'text',
            dataType: 'field',
            data: null,
            parentId: null,
            position: null,
          },
          {
            id: 5,
            name: 'email',
            title: 'Email',
            type: 'text',
            dataType: 'field',
            data: null,
            parentId: null,
            position: null,
          },
        ],
        updatedAt: '2023-10-27 10:11:57.878907',
      };
    }
    return {};
  }

}
