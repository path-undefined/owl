export interface NodeMatcher {
  type: string;
  definition: NodeRule;
}

export type NodeRule =
| SingleTokenNodeRule
| SingleNodeNodeRule
| CasesNodeRule
| SequenceNodeRule;

export interface SingleTokenNodeRule extends BaseNodeRule {
  token: string;
}

export interface SingleNodeNodeRule extends BaseNodeRule {
  node: string;
}

export interface CasesNodeRule extends BaseNodeRule {
  cases: NodeRule[];
}

export interface SequenceNodeRule extends BaseNodeRule {
  sequence: NodeRule[];
}

export interface BaseNodeRule {
  name?: string;
  optional?: true;
  repeat?: true;
  replace?: true;
}

export function isSingleTokenNodeRule(d: NodeRule): d is SingleTokenNodeRule {
  return !!(d as any).token;
}

export function isSingleNodeNodeRule(d: NodeRule): d is SingleNodeNodeRule {
  return !!(d as any).node;
}

export function isSequenceNodeRule(d: NodeRule): d is SequenceNodeRule {
  return !!(d as any).sequence;
}

export function isCasesNodeRule(d: NodeRule): d is CasesNodeRule {
  return !!(d as any).cases;
}
