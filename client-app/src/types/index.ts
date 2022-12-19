export interface PageDataType {
  currentPage: number;
  groupedBy?: string;
  groupsOnPage?: number;
  pageSize?: number;
  resultsOnPage: number;
  startingResult?: number;
  totalPages?: number;
  totalResults: number;
}
