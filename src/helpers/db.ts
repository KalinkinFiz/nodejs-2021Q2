import { getConnection, createConnection } from 'typeorm';
import { TUser } from '../resources/users/user.type';
import { TBoard } from '../resources/boards/board.type';
import { TTask } from '../resources/tasks/task.type';

import { config } from '../common/ormconfig';

export const connectedDB = async () => {
  let connection = null;

  try {
    connection = getConnection();
  } catch (error) {
    // handle error
  }

  try {
    if (connection && !connection.isConnected) {
      await connection.connect();
    } else {
      await createConnection(config);
    }

    console.log('Succesfully DB connected');
  } catch (error) {
    console.log('typeorm connection failed', error);
    process.exit(1);
  }
};

const users: TUser[] = [];
const boards: TBoard[] = [];
const tasks: TTask[] = [];

export default { users, boards, tasks, connectedDB };
