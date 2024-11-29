import Link from 'src/domain/entities/Link';
import ValidationError from 'src/domain/errors/ValidationError';
import { validateProperties } from 'src/domain/validations';

class CreateLinkDto {
  private originalUrl: string;
  private idUser: string | null;

  constructor(originalUrl: string, idUser: string | null) {
    this.originalUrl = originalUrl;
    this.idUser = idUser;

    this.validate();
  }

  private validate(): void {
    validateProperties(this, ['originalUrl']);

    if (this.originalUrl.length < 3 || this.originalUrl.length > 120) {
      throw new ValidationError('Email must be between 3 and 120 characters');
    }

    if (this.idUser && this.idUser.length !== 36) {
      throw new ValidationError('Invalid user id');
    }
  }

  public toDomain(shortCode: string): Link {
    return new Link(
      0,
      this.originalUrl,
      shortCode,
      true,
      new Date(),
      null,
      null,
      this.idUser ?? null,
      null,
    );
  }

  public getOriginalUrl(): string {
    return this.originalUrl;
  }
}

export default CreateLinkDto;
