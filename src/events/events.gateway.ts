import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

let onServerLockList = [];

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  //절체 시작
  @SubscribeMessage('getServerLockList')
  async getServerLockList() {
    return onServerLockList;
  }

  //절체 시작
  @SubscribeMessage('onServerLock')
  async onServerLock(@MessageBody() servername: string) {
    onServerLockList.push(servername);
    this.server.emit('onServerLockListToClient', onServerLockList);
  }

  //절체 성공, 실패 상관없이 프로세스가 종료
  @SubscribeMessage('onServerUnlock')
  async onServerUnlock(@MessageBody() servername: string) {
    console.log(servername, '이름?');
    onServerLockList = onServerLockList.filter(
      (lockedserver) => lockedserver !== servername,
    );
    this.server.emit('onServerLockListToClient', onServerLockList);
  }
}
