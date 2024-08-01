export const enum MoreStatus {
  Loading = 'loading',
  NoMore = 'no-more',
  More = 'more',
}

export interface PageState {
  page: number;
  limit: number;
  skip: number;
  more: MoreStatus;
}
