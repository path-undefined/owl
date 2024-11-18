import { tokenMatchers } from "./token-matchers";
import {
  valueRelatedNodeDefinitions,
  typeRelatedNodeDefinitions,
  expressionRelatedNodeDefinitions,
} from "./node-matchers";
import {
  CasesNodeRule,
  NodeRule,
  SequenceNodeRule,
  SingleNodeNodeRule,
  SingleTokenNodeRule,
} from "./types/node-matcher";

const tokenTypes: string[] = tokenMatchers.map(token => token.type);
const nodeAllTypes: string[] = [
  ...valueRelatedNodeDefinitions.map(node => node.type),
  ...typeRelatedNodeDefinitions.map(node => node.type),
  ...expressionRelatedNodeDefinitions.map(node => node.type),
];

const allNodes = [ 
  ...valueRelatedNodeDefinitions,
  ...typeRelatedNodeDefinitions,
  ...expressionRelatedNodeDefinitions,
];

function checkeTokensAndNodes(definition: NodeRule) {
  if ( isToken(definition) ) {
    if ( !tokenTypes.includes(definition.token) ) {
      console.log("The token is not found:", definition.token);
    }
  }

  if ( isNode(definition) ) {
    if ( !nodeAllTypes.includes(definition.node) ) {
      console.log("The node is not found:", definition.node);
    }
  }

  if ( isSequence(definition) ) {
    if ( definition.sequence ) {
      for( const item of definition.sequence) {
        checkeTokensAndNodes(item);
      }
    }
  }

  if(isCases(definition)) {
    if( definition.cases ) {
      for ( const item of definition.cases ) {
        checkeTokensAndNodes(item);
      }
    }
  }
}

for ( const definition of allNodes) {
  checkeTokensAndNodes(definition.definition);
}

function isToken(d: NodeRule): d is SingleTokenNodeRule {
  return !!(d as any).token;
}

function isNode(d: NodeRule): d is SingleNodeNodeRule {
  return !!(d as any).node;
}

function isSequence(d: NodeRule): d is SequenceNodeRule {
  return !!(d as any).sequence;
}

function isCases(d: NodeRule): d is CasesNodeRule {
  return !!(d as any).cases;
}