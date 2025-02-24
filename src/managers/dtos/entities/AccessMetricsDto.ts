import AccessMetrics from 'src/domain/entities/AccessMetrics';

class AccessMetricsDto {
  public id: number | null;

  public isActive: boolean;
  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  public idUser: string | null;
  public idLink: number;
  public idConsultant: string | null;

  constructor(accessMetrics: AccessMetrics) {
    this.id = accessMetrics.id;
    this.isActive = accessMetrics.isActive;
    this.createdAt = accessMetrics.createdAt;
    this.updatedAt = accessMetrics.updatedAt;
    this.deletedAt = accessMetrics.deletedAt;
    this.idLink = accessMetrics.idLink;
    this.idConsultant = accessMetrics.idConsultant;
    this.idUser = accessMetrics.idUser;
  }
}

export default AccessMetricsDto;
