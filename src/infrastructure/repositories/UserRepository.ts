import { FindOptions, UpdateOptions } from 'sequelize';
import User from 'src/domain/entities/User';
import NotFoundEntityError from 'src/domain/errors/NotFoundEntityError';
import strings from 'src/domain/utils/strings';
import IEntityRepository from 'src/infrastructure/interfaces/IBaseRepository';
import IUserRepository from 'src/infrastructure/interfaces/IUserRepository';
import relationships from 'src/infrastructure/models/addons/relationships';
import UserModel from 'src/infrastructure/models/UserModel';
import { injectable } from 'tsyringe';

@injectable()
class UserRepository implements IEntityRepository<User>, IUserRepository {
  constructor() {}

  async getAll(options: FindOptions<User>): Promise<User[]> {
    const result = await UserModel.findAll(options);

    if (result.length < 1) {
      return [] as User[];
    }

    return result as User[];
  }

  async getOne(options: FindOptions<User>): Promise<User | null> {
    const result = await UserModel.findOne(options);

    return result as User;
  }

  async getById(id: number): Promise<User | null> {
    const result = await UserModel.findOne({
      where: {
        id: id,
      },
      include: relationships.user,
    });

    return result as User;
  }

  async create(entity: User): Promise<User> {
    const result = await UserModel.create(entity);

    return result as User;
  }

  async update(entity: User, options: UpdateOptions<User>): Promise<void> {
    const result = await UserModel.update(entity, options);

    if (result[0] < 1) {
      throw new NotFoundEntityError(strings.users);
    }
  }

  async delete(options: UpdateOptions<User>): Promise<void> {
    await UserModel.update(
      {
        isActive: false,
        deletedAt: new Date(),
      },
      options,
    );
  }
}

export default UserRepository;
