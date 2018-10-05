import { send } from "micro";
import { router, get } from "micro-fork";
import { readdir, stat } from "fs";
import { promisify } from "util";
import * as low from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import { fetchImagesFromDSB } from "./actions/fetchImagesFromDSB";
import { startDatabase } from "./utils/db";
import { imagesPath, dbFilePath } from "./config.json";
import { getList } from "./handlers/getList";
import { getInfo } from "./handlers/getInfo";
import { enableCORS } from "./utils/enableCORS";
import { isLoggedIn } from "./actions/isLoggedIn";

const db = startDatabase(dbFilePath, low, FileSync);
const dataFetcher = (endpoint, username, password) =>
  fetchImagesFromDSB(endpoint, username, password, imagesPath);
const authenticator = (endpoint, username, password) =>
  isLoggedIn(endpoint, username, password);

const dirReader = promisify(readdir);
const fileStatisticsGetter = promisify(stat);

export default router()(
  get("/info", getInfo, {
    db,
    send,
    enableCORS
  }),
  get("/list", getList, {
    db,
    dataFetcher,
    authenticator,
    imagesPath,
    send,
    dirReader,
    fileStatisticsGetter,
    enableCORS
  })
);
