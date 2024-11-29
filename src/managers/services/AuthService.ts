import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import BadRequestError from 'src/domain/errors/BadRequestError';
import UnauthorizedError from 'src/domain/errors/UnauthorizedError';
import IApplicationConfigProvider from 'src/infrastructure/interfaces/IApplicationConfigProvider';
import IUserRepository from 'src/infrastructure/interfaces/IUserRepository';
import ApplicationConfigProvider from 'src/infrastructure/providers/ApplicationConfigProvider';
import UserRepository from 'src/infrastructure/repositories/UserRepository';
import UserDto from 'src/managers/dtos/entities/UserDto';
import RegisterDto from 'src/managers/dtos/helpers/RegisterDto';
import UserLoggedDto from 'src/managers/dtos/helpers/UserLoggedDto';
import IAuthService from 'src/managers/interfaces/IAuthService';
import { injectable } from 'tsyringe';
import { v4 } from 'uuid';

@injectable()
class AuthService implements IAuthService {
  private readonly userRepository: IUserRepository;
  private readonly applicationConfigProvider: IApplicationConfigProvider;

  constructor(
    userRepository: UserRepository,
    applicationConfigProvider: ApplicationConfigProvider,
  ) {
    this.userRepository = userRepository;
    this.applicationConfigProvider = applicationConfigProvider;
  }

  async getInfo(email: string): Promise<UserDto> {
    const user = await this.userRepository.getOne({
      where: {
        email,
        isActive: true,
      },
    });

    if (!user) {
      return {} as UserDto;
    }

    return new UserDto(user);
  }

  async login(email: string, password: string): Promise<UserLoggedDto> {
    const user = await this.userRepository.getOne({ where: { email } });

    if (!user) {
      throw new BadRequestError('User not found');
    }

    const isAuthenticate = await bcrypt.compare(password, user.password);

    if (!isAuthenticate) {
      throw new UnauthorizedError('Invalid password');
    }

    const authConfig = this.applicationConfigProvider.getAuthConfig();

    user.password = '';

    const token = jwt.sign(user, authConfig.secretKey, {
      expiresIn: authConfig.expiresIn,
    });

    return new UserLoggedDto(user.name, email, token);
  }

  async register(newUser: RegisterDto): Promise<UserDto> {
    const userWithSameEmail = await this.userRepository.getOne({
      where: {
        email: newUser.getEmail(),
      },
    });

    if (userWithSameEmail) {
      throw new BadRequestError('User already exists');
    }

    const authConfig = this.applicationConfigProvider.getAuthConfig();

    const salt = await bcrypt.genSalt(authConfig.salt);
    const passwordHash = await bcrypt.hash(newUser.getPassword(), salt);

    newUser.updatePassword(passwordHash);

    const uuid = v4();

    const user = newUser.toDomain(uuid);

    await this.userRepository.create(user);

    return new UserDto(user);
  }
}

export default AuthService;
