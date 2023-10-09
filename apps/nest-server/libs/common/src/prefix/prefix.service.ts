import { Injectable } from '@nestjs/common';

@Injectable()
export class PrefixService {
  private globalPrefix: string = '';

  setGlobalPrefix(prefix: string): void {
    this.globalPrefix = prefix;
  }

  getGlobalPrefix(): string {
    return this.globalPrefix;
  }
}
