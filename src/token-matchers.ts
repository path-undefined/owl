import { TokenMatcher } from "./types/token-matcher";

export const tokenMatchers: TokenMatcher[] = [
  { type: "line_comment", match: "//" },
  { type: "meaningless_character", match: [" ", "\t", "\r", "\n"] },
  { type: "keyword_where", match: "where" },
  // where有了，还要加for、in、if、elseif、else、where、while、switch等等
  // ...

  // 这里思考两件事：
  // 1. 为什么identifier一定要放在keywords的后面？
  // 2. 为什么RegExp里面前面加了“^”，但是后面没有加“$”？
  { type: "identifier", match: /^[A-Za-z0-9_]*/ },
  
  // 加上其余的内容
  // ...
];
