import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClientLoggerService {
  constructor(private readonly configService: ConfigService) {
    // Access configuration values using configService
    const host = this.configService.get<string>('MANAGER_HOST', 'localhost');
    const port = this.configService.get<number>('MANAGER_PORT', 5003);

    // Initialize and export the ClientProxy instance with the configured values
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host,
        port,
      },
    });
  }

  // Define the client property
  public readonly client: ClientProxy;

}
