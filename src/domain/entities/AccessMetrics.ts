import Link from './Link';

class AcessMetrics {
  public id: number;

  public isActive: boolean;
  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  public idLink: number;
  public idUser: string;
  public idConsultant: string | null;

  public links: Link[];

  constructor(
    id: number,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
    idLink: number,
    idUser: string,
    idConsultant: string | null,
    links: Link[],
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

export default AcessMetrics;
