import Link from 'src/domain/entities/Link';
import ValidationError from 'src/domain/errors/ValidationError';

class UpdateLinkDto {
  private id: number;
  private shortCode: string | null;
  private originalUrl: string | null;

  constructor(id: number, shortCode: string | null, originalUrl: string | null) {
    this.id = id;
    this.shortCode = shortCode;
    this.originalUrl = originalUrl;

    this.validate();
  }

  private validate(): void {
    if (!this.shortCode && !this.originalUrl) {
      throw new ValidationError('At least one field must be filled');
    }
  }

  public toDomain(): Link {
    const entity = {
      id: this.id,
      shortCode: this.shortCode,
      originalUrl: this.originalUrl,
    } as Link;

    return entity;
  }
}

export default UpdateLinkDto;
