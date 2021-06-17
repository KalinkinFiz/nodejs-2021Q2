import { connectedDB } from './helpers/db';
import config from './common/config';
import app from './app';

import { unhandledRejection, uncaughtException } from './middlewares';

const { PORT } = config;

const server = async () => {
  await connectedDB();

  app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`));

  process.on('uncaughtException', uncaughtException);
  process.on('unhandledRejection', unhandledRejection);
};

server();
