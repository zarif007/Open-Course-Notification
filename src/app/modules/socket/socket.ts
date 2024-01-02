/* eslint-disable no-console */
import { Server } from 'socket.io';
import { connectToRedis } from '../../../shared/redis';
import { produceNotification } from '../kafka/kafka';

const pub = connectToRedis();
const sub = connectToRedis();

class SocketService {
  private _io: Server;

  constructor() {
    console.log('Socket Server');
    this._io = new Server({
      cors: {
        allowedHeaders: ['*'],
        origin: '*',
      },
    });
  }

  public initListeners() {
    const io = this._io;
    io.on('connect', socket => {
      const userId = socket.handshake.query.userId;
      const userChannel = `USER:${userId}`;

      sub.subscribe(userChannel);
      socket.join(userChannel);

      socket.on(
        'event: postNotification',
        async ({
          message,
          receiver,
        }: {
          message: string;
          receiver: string;
        }) => {
          const recChannel = `USER:${receiver}`;
          await pub.publish(recChannel, JSON.stringify({ message }));
        }
      );
      socket.on('disconnect', () => {
        sub.unsubscribe(userChannel);
      });
    });

    sub.on('message', async (channel, notification) => {
      io.to(channel).emit('message', notification);
      await produceNotification(notification);
      console.log('from kafka broker');
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
