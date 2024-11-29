import { CreateOptions, FindOptions, UpdateOptions } from 'sequelize';

interface IEntityRepository<T> {
  getAll(options: FindOptions<T>): Promise<T[]>;
  getOne(options: FindOptions<T>): Promise<T | null>;
  getById(id: number): Promise<T | null>;
  create(entity: T, options?: CreateOptions<T>): Promise<T>;
  update(entity: T, options: UpdateOptions<T>): Promise<void>;
  delete(options: UpdateOptions<T>): Promise<void>;
}

export default IEntityRepository;
