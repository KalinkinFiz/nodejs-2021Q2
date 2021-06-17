import { getConnection, createConnection } from 'typeorm';
import { TUserModel } from '../resources/users/user.type';
import { TBoardModel } from '../resources/boards/board.type';
import { TTaskModel } from '../resources/tasks/task.type';

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

const users: TUserModel[] = [];
const boards: TBoardModel[] = [];
const tasks: TTaskModel[] = [];

export default { users, boards, tasks, connectedDB };
