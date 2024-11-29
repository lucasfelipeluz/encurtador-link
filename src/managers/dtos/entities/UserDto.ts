import User from 'src/domain/entities/User';

class UserDto {
  public id: string | null;
  public name: string;
  public email: string | null;
  public isActive: boolean;
  public createdAt: Date | null;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.isActive = user.isActive;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.deletedAt = user.deletedAt;
  }
}

export default UserDto;
