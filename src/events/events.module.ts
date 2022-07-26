import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { ServerLock } from './serverLockList';

@Module({
  imports: [EventsGateway],
  providers: [EventsGateway],
})
export class EventsModule {}
