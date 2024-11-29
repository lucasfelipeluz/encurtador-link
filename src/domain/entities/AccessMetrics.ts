import Link from './Link';

class AccessMetrics {
  public id: number;

  public isActive: boolean;
  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  public idLink: number;
  public idUser: string | null;
  public idConsultant: string | null;

  public links: Link | null;

  constructor(
    id: number,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
    idLink: number,
    idUser: string | null,
    idConsultant: string | null,
    links: Link | null,
  ) {
    this.id = id;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.idLink = idLink;
    this.idUser = idUser;
    this.idConsultant = idConsultant;
    this.links = links;
  }
}

export default AccessMetrics;
