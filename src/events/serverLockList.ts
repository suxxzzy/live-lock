import { Injectable } from '@nestjs/common';

@Injectable()
export class ServerLock {
  getserverLockStatus(): string[] {
    return [];
  }
}
