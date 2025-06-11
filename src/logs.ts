import prolog from "@qzda/prolog";
import { name, version } from "../package.json";

export function logVersion() {
  console.log(version);
}

export function logHelp() {
  const tab = "\t\t";

  console.log();
  console.log(prolog.bold("Usage:"));
  console.log(
    `  ${name} <${prolog.green("path")}> [${prolog.cyan("options")}]`
  );
  console.log();

  console.log(prolog.bold("Options:"));
  console.log(
    `  ${prolog.cyan(
      "-e, --ext"
    )}${tab}${"File extension to search for, default: all, example: js,ts"}`
  );
  console.log(
    `  ${prolog.cyan("-p, --port")}${tab}${"Port to use, default: 3000"}`
  );
  console.log(`  ${prolog.cyan("-h, --help")}${tab}${"Display help"}`);
  console.log(`  ${prolog.cyan("-v, --version")}${tab}${"Print the version"}`);

  console.log();
}
