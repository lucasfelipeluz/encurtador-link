import User from 'src/domain/entities/User';
import ValidationError from 'src/domain/errors/ValidationError';
import { validateProperties } from 'src/domain/validations';

class RegisterDto {
  private name: string;
  private email: string;
  private password: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;

    this.validate();
  }

  private validate(): void {
    validateProperties<RegisterDto>(this, ['name', 'email', 'password']);

    if (this.name.length < 3 || this.name.length > 100) {
      throw new ValidationError('Name must be between 3 and 100 characters');
    }
    if (this.email.length < 3 || this.email.length > 120) {
      throw new ValidationError('Email must be between 3 and 120 characters');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      throw new ValidationError('Email format is invalid');
    }

    if (this.password.length < 8 || this.password.length > 30) {
      throw new ValidationError('Password must be between 8 and 100 characters');
    }
  }

  public toDomain(uuid: string): User {
    return new User(uuid, this.name, this.email, this.password, true, new Date(), null, null);
  }

  getPassword(): string {
    return this.password;
  }

  updatePassword(password: string): void {
    this.password = password;
  }

  getEmail(): string | null {
    return this.email;
  }
}

export default RegisterDto;
