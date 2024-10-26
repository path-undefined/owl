export interface TokenMatcher {
  type: string;
  match: RegExp | string;
}

export function isMatchRegExp(match: RegExp | string): match is RegExp {
  return match instanceof RegExp;
}
