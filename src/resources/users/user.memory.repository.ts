import { EntityRepository, AbstractRepository } from 'typeorm';
import UserModel from './user.entity';

@EntityRepository(UserModel)
export class UserRepository extends AbstractRepository<UserModel> {
  createUser({ name, login, password }: Omit<UserModel, 'id'>) {
    const user = new UserModel();
    user.name = name;
    user.login = login;
    user.password = password;
    return this.manager.save(user);
  }

  getAllUsers() {
    return this.repository.find();
  }

  getById(id: string) {
    return this.repository.findOne({ id });
  }

  updateById(id: string, user: Omit<UserModel, 'id'>) {
    return this.repository.update({ id }, user);
  }

  deleteById(id: string) {
    return this.repository.delete({ id });
  }
}
