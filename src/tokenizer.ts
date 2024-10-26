import { Token } from "./types/token";
import { SourceFile } from "./types/source-file";
import { tokenMatchers } from "./token-matchers";
import { isMatchRegExp } from "./types/token-matcher";

export function tokenize(sourceFile: SourceFile): Token[] {
  const tokens: Token[] = [];
  const sourceFileContentLines = sourceFile.content.split("\n");

  for (let lineNum = 1; lineNum < sourceFileContentLines.length + 1; lineNum++) {
    let copiedLine = sourceFileContentLines[lineNum - 1];
    
    let charNum = 1;
    while (copiedLine.length > 0) {
      let token: Token | null = null;

      for (const tokenMatcher of tokenMatchers) {
        const matcher = tokenMatcher.match;
        let content = "";

        if (isMatchRegExp(matcher)) {
          const matchResult = matcher.exec(copiedLine);
          if (matchResult) {
            content = matchResult[0];
          }
        } else {
          if (copiedLine.startsWith(matcher)) {
            content = matcher;
          }
        }

        if (content !== "") {
          if (!token || token.content.length < content.length) {
            token = {
              type: tokenMatcher.type,
              content,
              line: lineNum,
              start: charNum,
            };
          }
        }
      }

      if (token === null) {
        throw Error(`Unexpected token in ${sourceFile.path}:${lineNum}:${charNum}`);
      }

      if (token.type === "line_comment") {
        break;
      }

      if (token.type !== "meaningless_character") {
        tokens.push(token);
      }

      charNum += token.content.length;
      copiedLine = copiedLine.substring(token.content.length);
    }
  }

  return tokens;
}
