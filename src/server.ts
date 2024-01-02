/* eslint-disable no-console */
import { Server } from 'http';
import app from './app';
import envConfig from './config/envConfig';
import SocketService from './app/modules/socket/socket';

async function bootstrap() {
  const server: Server = app.listen(envConfig.PORT, () => {
    console.log(`Server running on PORT ${envConfig.PORT}`);
  });

  const socketService = new SocketService();
  socketService.io.attach(server);
  socketService.initListeners();

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log('Server closed');
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    console.log(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
      server.close();
    }
  });
}

bootstrap();
