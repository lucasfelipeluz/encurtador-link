import UserDto from 'src/managers/dtos/entities/UserDto';
import UserLoggedDto from 'src/managers/dtos/helpers/UserLoggedDto';
import RegisterDto from 'src/managers/dtos/helpers/RegisterDto';

interface IAuthService {
  getInfo(email: string): Promise<UserDto>;
  login(email: string, password: string): Promise<UserLoggedDto>;
  register(newUser: RegisterDto): Promise<UserDto>;
}

export default IAuthService;
