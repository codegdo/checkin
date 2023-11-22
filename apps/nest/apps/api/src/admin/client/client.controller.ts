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
  @Permissions(ClientPermission.GET_CLIENT_LOGIN)
  async getClientLogin(@Param('id') id: number) {
    return {
      company: {
        id,
      },
      model: {
        app: {},
      },
    };
  }
}
