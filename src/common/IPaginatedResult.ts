export interface IPaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  last_page: number;
}
