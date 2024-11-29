import AccessMetrics from 'src/domain/entities/AccessMetrics';
import ValidationError from 'src/domain/errors/ValidationError';
import { validateProperties } from 'src/domain/validations';

class CreateAccessMetricsDto {
  public idLink: number;
  public idConsultant: string | null;
  public idUser: string;

  constructor(idLink: number, idConsultant: string | null, idUser: string) {
    this.idLink = idLink;
    this.idConsultant = idConsultant;
    this.idUser = idUser;

    this.validate();
  }

  private validate(): void {
    validateProperties(this, ['idLink', 'idConsultant', 'idUser']);

    if (this.idLink < 1) {
      throw new ValidationError('Invalid link');
    }
    if (this.idUser.length < 3 || this.idUser.length > 120) {
      throw new ValidationError('Invalid user');
    }
  }

  public toDomain(): AccessMetrics {
    return new AccessMetrics(
      0,
      true,
      new Date(),
      null,
      null,
      this.idLink,
      this.idUser,
      this.idConsultant,
      null,
    );
  }
}

export default CreateAccessMetricsDto;
