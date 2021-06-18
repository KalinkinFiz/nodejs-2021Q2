import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export default class UserModel {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column()
  public name!: string;

  @Column()
  public login!: string;

  @Column()
  public password!: string;

  static toResponse({ id, login, name }: UserModel) {
    return { id, login, name };
  }
}
