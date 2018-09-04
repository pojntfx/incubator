import { safeLoad } from "js-yaml";
import { readFileSync } from "fs";

const loadFile = (path: string) => safeLoad(readFileSync(path, "utf-8"));

export { loadFile };
