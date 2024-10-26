import { parseArgs } from "node:util";
import { readFileSync, writeFileSync } from "node:fs";
import { SourceFile } from "./src/types/source-file";
import { compile } from "./src/compiler";

(function() {
  const parseOptions = {
    output: {
      type: "string" as const,
      short: "o",
      default: "a.out",
    },
  };

  const parseResult = parseArgs({
    args: process.argv.slice(2),
    options: parseOptions,
    strict: true,
    allowPositionals: true,
  });
  
  const outputFile = parseResult.values["output"];
  const inputFiles = parseResult.positionals;

  const sourceFiles: SourceFile[] = [];
  for (const inputFile of inputFiles) {
    const inputFileContent = readFileSync(inputFile, { encoding: "utf8" });
    sourceFiles.push({
      path: inputFile,
      content: inputFileContent,
    });
  }

  let outputFileContent: string = "";
  try {
    outputFileContent = compile(sourceFiles);
  } catch(e) {
    if (!(e instanceof Error)) {
      console.error("An unknown error occurs. Abort!");
    } else {
      console.error((e as Error).message);
    }
    process.exit(1);
  }

  writeFileSync(outputFile, outputFileContent, { encoding: "utf8" });
})();
