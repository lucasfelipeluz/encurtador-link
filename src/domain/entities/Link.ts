import AccessMetrics from './AccessMetrics';

class Link {
  public id: number;

  public shortCode: string;
  public originalUrl: string;

  public isActive: boolean;
  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  public idUser: string | null;

  public accessMetrics: AccessMetrics[] | null;

  constructor(
    id: number,
    originalUrl: string,
    shortCode: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
    idUser: string | null,
    accessMetrics: AccessMetrics[] | null,
  ) {
    this.id = id;
    this.originalUrl = originalUrl;
    this.shortCode = shortCode;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.idUser = idUser;
    this.accessMetrics = accessMetrics;
  }
}

export default Link;
