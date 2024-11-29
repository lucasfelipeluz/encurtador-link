import Link from 'src/domain/entities/Link';
import ValidationError from 'src/domain/errors/ValidationError';
import { validateProperties } from 'src/domain/validations';

class CreateLinkDto {
  public shortCode: string;
  public originalUrl: string;

  constructor(shortCode: string, originalUrl: string) {
    this.shortCode = shortCode;
    this.originalUrl = originalUrl;

    this.validate();
  }

  private validate(): void {
    validateProperties(this, ['shortCode', 'originalUrl']);

    if (this.shortCode.length > 6) {
      throw new ValidationError('Name must be between 3 and 100 characters');
    }
    if (this.originalUrl.length < 3 || this.originalUrl.length > 120) {
      throw new ValidationError('Email must be between 3 and 120 characters');
    }
  }

  public toDomain(idUserLogged?: string): Link {
    return new Link(
      0,
      this.originalUrl,
      this.shortCode,
      true,
      new Date(),
      null,
      null,
      idUserLogged ?? null,
    );
  }
}

export default CreateLinkDto;
