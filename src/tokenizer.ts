import { Token } from "./types/token";
import { tokenMatchers } from "./token-matchers";

export function tokenize(inputFileContent: string): Token[] {
  const tokens: Token[] = [];
  const inputFileContentLines = inputFileContent.split("\n");

  let lineNum = 1;
  for (let lineNum = 1; lineNum < inputFileContentLines.length + 1; lineNum++) {
    let copiedLine = inputFileContentLines[lineNum - 1];
    
    let charNum = 1;
    while (copiedLine.length > 0) {
      // 魔法列表是tokenMatchers
      // Boss的血条就是copiedContent
      // 选择魔法消耗Boss的血量，并且捡取Boss掉落的token，按照顺序排列在tokens数组内。

      // 这里打Boss
      // copiedLine = copiedLine.substring(0, length);

      // 这里拾取掉落的token
      // tokens.push({
      //   type: "identifier", // 这里要加入tokenMatcher的类型，比如说identifier、keyword_where等
      //   content: "myVariable", // 这里要加入与tokenMatcher匹配的字符串，比如说这里identifier匹配的字符串叫做myVariable，可能是一个变量名
      //   line: 15, // 这里要写这里是代码中的第几行，比如说这里就是代码的第15行，可以直接用lineNum变量
      //   start: 7, // 这里要写这里是代码中的第几个字符，比如说这里是代码的第7个字符
      // });

      // 下面这一行请删掉：
      break;
    }
  }

  return tokens;
}
