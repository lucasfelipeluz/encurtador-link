import Link from 'src/domain/entities/Link';
import IEntityRepository from './IBaseRepository';

interface ILinkRepository extends IEntityRepository<Link> {}

export default ILinkRepository;
