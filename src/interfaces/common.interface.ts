export interface TableData {
  total: number,
  pageIndex: number,
  pageSize: number,
  query: string,
  sort?: {
    order: string,
    key: string
  }
};