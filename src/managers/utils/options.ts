export type SearchOptions<T> = {
  where?: {
    [K in keyof T]?: T[K] | T[K][];
  };
  isActive?: boolean;
  order?: {
    through: keyof T;
    by: 'ASC' | 'DESC';
  }[];
  limit?: number;
  offset?: number;
  attributes?: {
    exclude?: (keyof T)[];
    include?: (keyof T)[];
  };
};

export type CreationOptions = {
  logging?: boolean;
};

export type EditingOptions = {
  where?: Record<string, unknown>;
  isActive?: boolean;
  silent?: boolean;
  limit?: number;
  logging?: boolean;
};

export type DeletionOptions = {
  where?: Record<string, unknown>;
  isActive?: boolean;
  silent?: boolean;
  limit?: number;
  logging?: boolean;
};
