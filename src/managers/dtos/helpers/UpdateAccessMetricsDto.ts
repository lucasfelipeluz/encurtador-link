import AccessMetrics from 'src/domain/entities/AccessMetrics';
import ValidationError from 'src/domain/errors/ValidationError';

class UpdateAccessMetricsDto {
  private id: number;
  private idLink: number | null;
  private idUser: string | null;
  private idConsultant: string | null;

  constructor(id: number, idLink: number, idUser: string, idConsultant: string | null) {
    this.id = id;
    this.idLink = idLink;
    this.idUser = idUser;
    this.idConsultant = idConsultant;

    this.validate();
  }

  private validate(): void {
    if (this.id < 1) {
      throw new ValidationError('Invalid id');
    }
    if (this.idLink && this.idLink < 1) {
      throw new ValidationError('Invalid link');
    }
    if (this.idUser && (this.idUser.length < 3 || this.idUser.length > 120)) {
      throw new ValidationError('Invalid user');
    }
    if (this.idConsultant && (this.idConsultant.length < 3 || this.idConsultant.length > 120)) {
      throw new ValidationError('Invalid consultant');
    }
  }

  public toDomain(): AccessMetrics {
    const entity = {
      id: this.id,
      idLink: this.idLink,
      idUser: this.idUser,
      idConsultant: this.idConsultant,
    } as AccessMetrics;

    return entity;
  }
}

export default UpdateAccessMetricsDto;
