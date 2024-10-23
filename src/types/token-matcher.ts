export interface TokenMatcher {
  type: string;
  match: RegExp | string[] | string;
}
