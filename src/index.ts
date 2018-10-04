import { send } from "micro";
import { router, get } from "micro-fork";
import { readdir, stat } from "fs";
import { promisify } from "util";
import * as low from "lowdb";
import { fetchImagesFromDSB } from "./actions/fetchImagesFromDSB";
import { startDatabase } from "./utils/db";
import { updateList } from "./handlers/updateList";
import * as FileSync from "lowdb/adapters/FileSync";
import { dsb, imagesPath, dbFilePath } from "./config.json";
import { getList } from "./handlers/getList";

const db = startDatabase(dbFilePath, low, FileSync);
const dataFetcher = () =>
  fetchImagesFromDSB(dsb.endpoint, dsb.username, dsb.password, imagesPath);

const dirReader = promisify(readdir);
const fileStatisticsGetter = promisify(stat);

export default router()(
  get("/info", updateList, {
    db,
    dataFetcher,
    send
  }),
  get("/list", getList, {
    imagesPath,
    send,
    dirReader,
    fileStatisticsGetter
  })
);
