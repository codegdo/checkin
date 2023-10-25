import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MANAGER_CLIENT, WORKER_CLIENT } from '../../constants';

@Injectable()
export class ClientService {
  constructor(
    @Inject(MANAGER_CLIENT) private readonly managerClient: ClientProxy,
    @Inject(WORKER_CLIENT) private readonly workerClient: ClientProxy,
  ) { }

  getManagerClient(): ClientProxy {
    return this.managerClient;
  }

  getWorkerClient(): ClientProxy {
    return this.workerClient;
  }
}
