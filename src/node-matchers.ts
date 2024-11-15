import { NodeMatcher } from "./types/node-matcher";

export const nodeDefinitions: NodeMatcher[] = [
  {
    type: "parentheses_expression",
    definition: {
      sequence: [
        { token: "symbol_bracket_left" },
        { node: "expression" },
        { token: "symbol_bracket_right" },
        { token: "symbol_minus"},
      ],
    },
  },
  {
    type: "unary operator_expression",
    definition: {
      sequence: [
        {
          cases: [
            { token: "symbol_exclamation" },
            { token: "symbol_minus"},
            { token: "symbol_plus"},
            { token: "symbol_tilde"},
          ],
        },
        {
          cases: [
            { node: "single_value" },
            { node: "parentheses_expression" },
          ],
        },
      ],
    },
  },
  {
    type: "dot_op_expression",
    definition: {
      sequence: [
        {
          cases: [
            { node: "single_value" },
          ],
        },
        {
          cases: [
            { token: "symbol_asterisk" },
            { token: "symbol_slash"},
            { token: "symbol_percent"},
          ],
        },
        {
          cases: [
            { node: "single_value" },
          ],
        },
      ],
    }
  },
  {
    type: "dash_op_expression",
    definition: {
      sequence: [
        {
          cases: [
            { node: "single_value" },
          ],
        },
        {
          cases: [
            { token: "symbol_plus" },
            { token: "symbol_minus"},
          ],
        },
        {
          cases: [
            { node: "single_value" },
          ],
        },
      ],
    }
  },
  {
    type: "literal_value",
    definition: {
      cases: [
        { token: "literal_string", name: "value" },
        { token: "literal_integer", name: "value" },
        { token: "literal_float", name: "value" },
        { token: "literal_bool", name: "value" },
      ],
    },
  },
  {
    type: "expression",
    definition: {
      cases: [
        { node: "literal_value" },
      ],
    },
  },
  {
    type: "literal_type",
    definition: {
      cases: [
        { token: "identifier", name: "name" },
        {
          sequence: [
            { token: "identifier", name: "name" },
            { token: "symbol_caret_left" },
            { node: "literal_type", name: "typeParameter" },
            {
              sequence: [
                { token: "symbol_comma" },
                { node: "literal_type", name: "typeParameter" },
              ],
              optional: true,
              repeat: true,
            },
            { token: "symbol_caret_right" },
          ],
        },
      ],
    },
  },
  {
    type: "const_definition",
    definition: {
      sequence: [
        { token: "keyword_const" },
        { token: "identifier", name: "name" },
        {
          sequence: [
            { token: "symbol_colon" },
            { node: "literal_type", name: "type" },
          ],
          optional: true,
        },
        { token: "keyword_equal" },
        { node: "expression", name: "value" },
      ],
    },
  },
  {
    type: "variable_definition",
    definition: {
      sequence: [
        { token: "keyword_let" },
        { token: "identifier", name: "name" },
        {
          sequence: [
            { token: "symbol_colon" },
            { node: "literal_type", name: "type" },
          ],
          optional: true,
        },
        {
          sequence: [
            { token: "keyword_equal" },
            { node: "expression", name: "initialValue" },
          ],
          optional: true,
        },
      ],
    },
  },
];
