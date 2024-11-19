import { tokenMatchers } from "./token-matchers";
import { nodeDefinitions } from "./node-matchers";
import {
  isSingleNodeNodeRule,
  isSingleTokenNodeRule,
  isSequenceNodeRule,
  isCasesNodeRule,
  NodeRule,
} from "./types/node-matcher";

const tokenTypes: string[] = tokenMatchers.map((token) => token.type);
const nodeTypes: string[] = nodeDefinitions.map((node) => node.type);

function validateNodeRule(rule: NodeRule) {
  if (isSingleTokenNodeRule(rule)) {
    if (!tokenTypes.includes(rule.token)) {
      console.error(`The token "${rule.token}" is not defined.`);
    }
  } else if (isSingleNodeNodeRule(rule)) {
    if (!nodeTypes.includes(rule.node)) {
      console.error(`The node "${rule.node}" is not defined.`);
    }
  } else if (isSequenceNodeRule(rule)) {
    for(const subRule of rule.sequence) {
      validateNodeRule(subRule);
    }
  } else if (isCasesNodeRule(rule)) {
    for (const subRule of rule.cases) {
      validateNodeRule(subRule);
    }
  }
}

for (const definition of nodeDefinitions) {
  validateNodeRule(definition.definition);
}
