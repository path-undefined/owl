import { Token } from "./types/token";
import { tokenize } from "./tokenizer";

export function compile(inputFileContents: string[]): string {
  const tokens: Token[] = [];
  for (const inputFileContent of inputFileContents) {
    const tokensFromOneFile = tokenize(inputFileContent);
    tokens.concat(tokensFromOneFile);
  }

  return JSON.stringify(tokens, null, 2);
}
