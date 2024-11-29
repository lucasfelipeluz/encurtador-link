import User from 'src/domain/entities/User';
import IEntityRepository from './IBaseRepository';

interface IUserRepository extends IEntityRepository<User> {}

export default IUserRepository;
