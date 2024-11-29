import Link from 'src/domain/entities/Link';
import ValidationError from 'src/domain/errors/ValidationError';

class UpdateLinkDto {
  private id: number;
  private originalUrl: string;
  private idUser: number | null;

  constructor(id: number, originalUrl: string, idUser: number | null) {
    this.id = id;
    this.originalUrl = originalUrl;
    this.idUser = idUser;

    this.validate();
  }

  private validate(): void {
    if (this.originalUrl?.length < 3 || this.originalUrl?.length > 120) {
      throw new ValidationError('At least one field must be filled');
    }
    if (this.idUser && this.idUser.toString().length !== 36) {
      throw new ValidationError('Invalid user id');
    }
  }

  public toDomain(shortCode: string): Link {
    const entity = {
      id: this.id,
      shortCode,
      originalUrl: this.originalUrl,
    } as Link;

    return entity;
  }

  public getOriginalUrl(): string {
    return this.originalUrl;
  }

  public getId(): number {
    return this.id;
  }

  public getIdUser(): number | null {
    return this.idUser;
  }
}

export default UpdateLinkDto;
