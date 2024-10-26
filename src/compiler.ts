import { Token } from "./types/token";
import { SourceFile } from "./types/source-file";
import { tokenize } from "./tokenizer";

export function compile(sourceFiles: SourceFile[]): string {
  const tokens: Token[] = [];
  for (const sourceFile of sourceFiles) {
    const tokensFromOneFile = tokenize(sourceFile);
    tokens.push(...tokensFromOneFile);
  }

  return JSON.stringify(tokens, null, 2);
}
