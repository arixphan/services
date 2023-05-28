export interface PaginationResponse<T> {
  data: T[];
  total: number;
}

export interface BaseModel {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
}

export type ExtendBase<T> = T & BaseModel;
