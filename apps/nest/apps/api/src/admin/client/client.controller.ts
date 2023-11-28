import { Controller, Get, Param } from '@nestjs/common';

import { Permissions } from '../../common';
import { ClientAction } from './client.action';

@Controller()
export class ClientController {
  @Get()
  @Permissions(ClientAction.GET_ALL_CLIENTS)
  async getAllClients() {
    return [
      {
        id: '123abc',
        companyId: 1,
        companyName: 'Nail San Diego',
      },
      {
        id: '345def',
        companyId: 2,
        companyName: 'Nail New York',
      },
    ];
  }

  @Get(':id')
  @Permissions(ClientAction.GET_CLIENT_ACCESS)
  async getClientAccess(@Param('id') id: number) {
    return {
      account: {
        id: '123abc',
        companyId: id,
        isActive: true,
      },
      model: {
        app: {
          modules: [
            {
              name: 'iam',
              group: 'app',
            },
            {
              name: 'builder',
              group: 'app',
            },
          ],
          views: {
            iam: [
              {
                name: 'users',
                group: 'app_iam',
              },
            ],
            builder: [
              {
                name: 'templates',
                group: 'app_builder',
              },
              {
                name: 'emails',
                group: 'app_builder',
              },
              {
                name: 'forms',
                group: 'app_builder',
              },
            ],
          },
          objects: {
            users: [
              {
                name: 'user',
                slug: 'users',
              },
              {
                name: 'group',
                slug: 'groups',
              },
              {
                name: 'role',
                slug: 'roles',
              },
              {
                name: 'policy',
                slug: 'policies',
              },
            ],
            templates: [
              {
                name: 'template',
                slug: 'templates',
              },
            ],
            emails: [
              {
                name: 'email',
                slug: 'emails',
              },
            ],
            forms: [
              {
                name: 'form',
                slug: 'forms',
              },
            ],
          },
          actions: {},
        },
      },
    };
  }

  @Get('switch')
  @Permissions(ClientAction.GET_CLIENT_SWITCH)
  async getClientSwitch(@Param('id') id: number) {
    return { ok: true };
  }
}
