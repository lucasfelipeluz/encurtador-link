import Link from 'src/domain/entities/Link';

class LinkDto {
  public id: number | null;

  public shortCode: string;
  public originalUrl: string;

  public isActive: boolean;
  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  public idUser: string | null;

  constructor(link: Link) {
    this.id = link.id;
    this.originalUrl = link.originalUrl;
    this.shortCode = link.shortCode;
    this.isActive = link.isActive;
    this.createdAt = link.createdAt;
    this.updatedAt = link.updatedAt;
    this.deletedAt = link.deletedAt;
    this.idUser = link.idUser;
  }
}

export default LinkDto;
