import { NodeMatcher } from "./types/node-matcher";

export const valueRelatedNodeDefinitions: NodeMatcher[] = [
  {
    type: "literal_list",
    definition: {
      sequence: [
        { token: "symbol_square_bracket_left" },
        {
          sequence: [
            { node: "expression", name: "item" },
            {
              sequence: [
                { token: "symbol_comma" },
                { node: "expression", name: "item" },
              ],
              optional: true,
              repeat: true,
            },
            { token: "symbol_comma", optional: true },
          ],
          optional: true,
        },
        { token: "symbol_square_bracket_right" },
      ],
    },
  },
  {
    type: "literal_struct",
    definition: {
      sequence: [
        { token: "symbol_curly_bracket_left" },
        {
          sequence: [
            { token: "identifier", name: "key" },
            { token: "symbol_colon" },
            { node: "expression", name: "value" },
            {
              sequence: [
                { token: "symbol_comma" },
                {
                  sequence: [
                    { token: "identifier", name: "key" },
                    { token: "symbol_colon" },
                    { node: "expression", name: "value" },
                  ],
                },
              ],
              optional: true,
              repeat: true,
            },
            { token: "symbol_comma", optional: true },
          ],
          optional: true,
        },
        { token: "symbol_curly_bracket_right" },
      ],
    },
  },
  {
    type: "literal_value",
    definition: {
      cases: [
        { token: "literal_string" },
        { token: "literal_integer" },
        { token: "literal_float" },
        { token: "literal_bool" },
        { node: "literal_list" },
        { node: "literal_struct" },
      ],
    },
  },
  {
    type: "single_value",
    definition: { 
      cases: [
        { node: "literal_value" },
        { token: "identifier" },
      ]
    },
  },
];

export const typeRelatedNodeDefinitions: NodeMatcher[] = [
  {
    type: "type_argument_list",
    definition: {
      sequence: [
        { token: "symbol_caret_left" },
        {
          sequence: [
            { node: "type_expression", name: "typeArgument" },
            {
              sequence: [
                { token: "symbol_comma" },
                { node: "type_expression", name: "typeArgument" },
              ],
              optional: true,
              repeat: true,
            },
            { token: "symbol_comma", optional: true },
          ],
          optional: true,
        },
        { token: "symbol_caret_right" },
      ],
    },
  },
  {
    type: "type_expression",
    definition: {
      sequence: [
        {
          cases: [
            { token: "keyword_const" },
            { token: "keyword_opt" },
          ],
          name: "modifier",
          optional: true,
        },
        { token: "identifier", name: "name" },
        { node: "type_argument_list", optional: true },
      ],
    }
  },
];

export const expressionRelatedNodeDefinitions: NodeMatcher[] = [
  {
    type: "parentheses_expression",
    definition: {
      cases: [
        {
          sequence: [
            { token: "symbol_bracket_left" },
            { node: "expression" },
            { token: "symbol_bracket_right" },
          ],
        },
        { node: "single_value", replace: true },
      ],
    },
  },
  {
    type: "array_indexing_expression",
    definition: {
      sequence: [
        { node: "value_accessing_expression", name: "array" },
        { token: "symbol_square_bracket_left" },
        { node: "expression", name: "index" },
        { token: "symbol_square_bracket_right" },
      ],
    },
  },
  {
    type: "function_invoking_expression",
    definition: {
      sequence: [
        { node: "value_accessing_expression", name: "function" },
        { node: "type_argument_list", optional: true },
        { token: "symbol_bracket_left" },
        {
          sequence: [
            { node: "expression", name: "argument" },
            {
              sequence: [
                { token: "symbol_comma" },
                { node: "expression", name: "argument" },
              ],
              optional: true,
              repeat: true,
            },
            { token: "symbol_comma", optional: true },
          ],
          name: "argument_list",
          optional: true,
        },
        { token: "symbol_bracket_right" },
      ],
    },
  },
  {
    type: "member_accessing_expression",
    definition: {
      sequence: [
        { node: "value_accessing_expression" },
        { token: "symbol_dot" },
        { token: "identifier" },
      ],
    },
  },
  {
    type: "value_accessing_expression",
    definition: {
      cases: [
        { node: "array_indexing_expression" },
        { node: "function_invoking_expression" },
        { node: "member_accessing_expression" },
        { node: "parentheses_expression", replace: true },
      ],
    },
  },
  {
    type: "unary_op_expression",
    definition: {
      cases: [
        {
          sequence: [
            {
              cases: [
                { token: "symbol_exclamation" },
                { token: "symbol_minus"},
                { token: "symbol_plus"},
                { token: "symbol_tilde"},
              ],
            },
            { node: "unary_op_expression" },
          ],
        },
        { node: "parentheses_expression", replace: true },
      ],
    },
  },
  {
    type: "dot_op_expression",
    definition: {
      cases: [
        {
          sequence: [
            { node: "dot_op_expression" },
            {
              cases: [
                { token: "symbol_asterisk" },
                { token: "symbol_slash"},
                { token: "symbol_percent"},
              ],
            },
            { node: "unary_op_expression" },
          ],
        },
        { node: "unary_op_expression", replace: true },
      ],
    },
  },
  {
    type: "dash_op_expression",
    definition: {
      cases: [
        {
          sequence: [
            { node: "dash_op_expression" },
            {
              cases: [
                { token: "symbol_plus" },
                { token: "symbol_minus"},
              ],
            },
            { node: "dot_op_expression" },
          ],
        },
        { node: "dot_op_expression", replace: true },
      ],
    },
  },
  {
    type: "shift_op_expression",
    definition: {
      cases: [
        {
          sequence: [
            { node: "shift_op_expression" },
            {
              cases: [
                { token: "symbol_double_caret_left" },
                { token: "symbol_double_caret_right"},
              ],
            },
            { node: "dash_op_expression" },
          ],
        },
        { node: "dash_op_expression", replace: true },
      ],
    },
  },
  {
    type: "bit_and_op_expression",
    definition: {
      cases: [
        {
          sequence: [
            { node: "bit_and_op_expression" },
            { token: "symbol_ampersand" },
            { node: "shift_op_expression" },
          ],
        },
        { node: "shift_op_expression", replace: true },
      ],
    },
  },
  {
    type: "bit_xor_op_expression",
    definition: {
      cases: [
        {
          sequence: [
            { node: "bit_xor_op_expression" },
            { token: "symbol_caret" },
            { node: "bit_and_op_expression" },
          ],
        },
        { node: "bit_and_op_expression", replace: true },
      ],
    },
  },
  {
    type: "bit_or_op_expression",
    definition: {
      cases: [
        {
          sequence: [
            { node: "bit_or_op_expression" },
            { token: "symbol_pipe" },
            { node: "bit_xor_op_expression" },
          ],
        },
        { node: "bit_xor_op_expression", replace: true },
      ],
    },
  },
  {
    type: "comparison_op_expression",
    definition: {
      cases: [
        {
          sequence: [
            { node: "comparison_op_expression" },
            { 
              cases: [
                { token: "symbol_caret_left" },
                { token: "symbol_caret_right" },
                { token: "symbol_caret_left_equal" },
                { token: "symbol_caret_right_equal" },
                { token: "symbol_double_equal" },
                { token: "symbol_exclamation_equal" },
              ],
            },
            { node: "bit_or_op_expression" },
          ],
        },
        { node: "bit_or_op_expression", replace: true },
      ],
    },
  },
  {
    type: "logical_and_op_expression",
    definition: {
      cases: [
        {
          sequence: [
            { node: "logical_and_op_expression" },
            { token: "symbol_double_ampersand" },
            { node: "comparison_op_expression" },
          ],
        },
        { node: "comparison_op_expression", replace: true },
      ],
    },
  },
  {
    type: "logical_or_op_expression",
    definition: {
      cases: [
        {
          sequence: [
            { node: "logical_or_op_expression" },
            { token: "symbol_double_pipe" },
            { node: "logical_and_op_expression" },
          ],
        },
        { node: "logical_and_op_expression", replace: true },
      ],
    },
  },
  {
    type: "expression",
    definition: { node: "logical_or_op_expression", replace: true },
  },
];
