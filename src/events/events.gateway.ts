import { Injectable } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { ServerLock } from './serverLockList';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  constructor(private readonly serverLock: ServerLock) {}

  @WebSocketServer()
  server: Server;

  //   @SubscribeMessage('events')
  //   findAll(@MessageBody() data: any): Observable<WsResponse<any>> {
  //     return from([1, 2, 3]).pipe(
  //       map((item) => ({ event: 'events', data: [item, data] })),
  //     );
  //   }

  //   @SubscribeMessage('identity')
  //   async identity(@MessageBody() data: number): Promise<number> {
  //     return data;
  //   }

  //이벤트 종류
  //탭을 열고 절체 요청 시작 시, 해당 자원이 누군가에 의해 선점되었음을 접속한 모든 클라이언트에게 응답
  //절체가 완료되었을 시 해당 자원에 다시 접근할 수 있음을 접속한 모든 클라이언트에게 응답
  @SubscribeMessage('webserverLock')
  onWebServerLock(@MessageBody() data: string) {
    return this.serverLock.getserverLockStatus().push(data);
  }

  @SubscribeMessage('webserverRelease')
  onWebServerRelease(@MessageBody() data: string) {
    return this.serverLock
      .getserverLockStatus()
      .filter((servername: string) => servername !== data);
  }
}
