import process from "node:process";
import fs from "node:fs";
import log from "@qzda/prolog";
import { logHelp, logVersion } from "./logs";
import { startServers } from "./server";
import { name, version } from "../package.json";
import { getDuplicates } from "./duplicates";

async function main(args: string[]) {
  process.stdin.on("data", (data) => {
    if (data.toString().trim().startsWith(":q")) {
      process.exit(0);
    }
  });

  if (args.length === 1 && ["-v", "--version"].includes(args[0])) {
    logVersion();
    process.exit(0);
  } else if (args.length === 1 && ["-h", "--help"].includes(args[0])) {
    logHelp();
    process.exit(0);
  } else {
    console.log(log.blue(`${name} v${version}`));
    console.log();

    let port: number = 3000;
    if (args.indexOf("-p") > -1) {
      port = +(args[args.indexOf("-p") + 1] || port);
    }
    if (args.indexOf("--port") > -1) {
      port = +(args[args.indexOf("--port") + 1] || port);
    }

    let path = "";
    if (args[0] && args[0][0] !== "-") {
      path = args[0];
    } else {
      path = process.cwd();
    }
    let ext: string[] = [];
    if (args.indexOf("-e") > -1) {
      ext = args[args.indexOf("-e") + 1]?.split(",").map((e) => e.trim()) || [];
    }
    if (args.indexOf("--ext") > -1) {
      ext =
        args[args.indexOf("--ext") + 1]?.split(",").map((e) => e.trim()) || [];
    }

    console.log(`Searching for duplicates in ${log.green(path)}`);
    const filter =
      ext.length > 0
        ? (file: string) => ext.includes(file.split(".").pop() || "")
        : undefined;
    const { duplicates, duplicateCount } = await getDuplicates(path, filter);
    fs.writeFileSync("duplicates.json", JSON.stringify(duplicates, null, 2));
    console.log(log.bold(`${log.yellow(duplicateCount)} duplicates found`));
    console.log();
    Object.keys(duplicates).forEach((hash) => {
      console.log(log.yellow(hash));
      duplicates[hash].forEach((file, index) => {
        console.log(`    ${index + 1}. ${log.green(file)}`);
      });
    });

    const server = startServers(duplicates, {
      path,
      port,
    });

    process.on("SIGINT", () => {
      process.exit(0);
    });

    process.on("beforeExit", () => {
      if (server.listening) {
        server.close();
        console.log(`closing server ${server.address()}`);
      }
      process.exit(0);
    });
  }

  console.log();
}

const args: string[] = [];
process.argv.slice(2).forEach((arg) => {
  if (arg.startsWith("-")) {
    args.push(arg);
  } else {
    if (args.at(-1)?.startsWith("-")) {
      args.push(arg);
    } else {
      if (args.at(-1)) {
        args[args.length - 1] = [args.at(-1) || "", arg].join(" ").trim();
      } else {
        args.push(arg);
      }
    }
  }
});

main(args);
