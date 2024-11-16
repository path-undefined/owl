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
