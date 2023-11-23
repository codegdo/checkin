import { ClientPermission, Permissions } from '@app/common';
import { Controller, Get, Param } from '@nestjs/common';

@Controller()
export class ClientController {
  @Get()
  @Permissions(ClientPermission.GET_ALL_CLIENTS)
  async getAllClients() {
    return [
      {
        accountId: '123abc',
        companyId: 1,
        companyName: 'Nail San Diego',
      },
      {
        accountId: '345def',
        companyId: 2,
        companyName: 'Nail New York',
      },
    ];
  }

  @Get(':id')
  @Permissions(ClientPermission.GET_CLIENT_ACCESS)
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
          ],
          views: {
            iam: [
              {
                name: 'users',
                group: 'app_iam',
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
          },
          actions: {},
        },
      },
    };
  }

  @Get('switch')
  @Permissions(ClientPermission.GET_CLIENT_SWITCH)
  async getClientSwitch(@Param('id') id: number) {
    return {ok: true};
  }
}
