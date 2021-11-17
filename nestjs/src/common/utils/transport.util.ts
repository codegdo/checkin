import { LogError } from 'src/models/main/entities';
import { getConnection } from 'typeorm';
import * as Transport from 'winston-transport';

export default class WinstonTransport extends Transport {
  private error = null;
  private info = null;

  constructor() {
    super();
    this.error = this.error;
    this.info = this.info;
  }

  private async insert({ message, stack }, { meta: { req } }) {

    const { url, headers: { host } } = req;

    const connection = await getConnection();
    const repository = connection.getRepository(LogError);
    const data = repository.create({ message, host, url, stack });

    await repository.save(data);
  }

  log(info, callback) {

    setImmediate(() => {
      this.emit('logged', info);
    });

    if (info.level === 'info') {
      this.info = info;
    }

    if (info.level === 'error') {
      this.error = info;
    }

    if (info.level === 'error' && this.info) {
      // Perform the writing to the remote service
      this.insert(info, this.info);
      this.error = null;
    }

    if (info.level === 'info' && this.error) {
      // Perform the writing to the remote service
      this.insert(this.error, info);
      this.error = null;
    }

    callback();
  }
}