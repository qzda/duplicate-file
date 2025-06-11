import path from "node:path";
import fs from "node:fs";
import log from "@qzda/prolog";
import { hashFile } from "hasha";

type FileFilter = (value: string, index: number, array: string[]) => boolean;

function getAllFilePath(dir: string, filter?: FileFilter) {
  let res: string[] = [];

  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      res = res.concat(getAllFilePath(filePath, filter));
    } else {
      res.push(filePath);
    }
  }

  return filter ? res.filter(filter) : res;
}

export async function getDuplicates(dir: string, filter?: FileFilter) {
  const fileList = getAllFilePath(dir, filter);

  const hashMap = new Map<string, string[]>();
  for (const file of fileList) {
    try {
      const _hash = await hashFile(file, { algorithm: "md5" });
      hashMap.set(_hash, (hashMap.get(_hash) || []).concat(file));
    } catch (error) {
      console.warn(`${log.red(file)}: ${error}`);
    }
  }

  const duplicates: Record<string, string[]> = {};
  let duplicateCount = 0;
  hashMap.forEach((files, hash) => {
    if (files.length > 1) {
      duplicates[hash] = files;
      duplicateCount += files.length - 1;
    }
  });

  return {
    duplicates,
    duplicateCount,
  };
}
