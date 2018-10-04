import { send } from "micro";
import * as handler from "serve-handler";
import { router, get } from "micro-fork";
import { readdir, stat } from "fs";
import { promisify } from "util";
import * as low from "lowdb";
import { fetchImagesFromDSB } from "./actions/fetchImagesFromDSB";
import { startDatabase } from "./utils/db";
import * as FileSync from "lowdb/adapters/FileSync";
import { endpoint, dsb, imagesPath, dbFilePath } from "./config.json";
import { getList } from "./handlers/getList";
import { getInfo } from "./handlers/getInfo";

const db = startDatabase(dbFilePath, low, FileSync);
const dataFetcher = () =>
  fetchImagesFromDSB(dsb.endpoint, dsb.username, dsb.password, imagesPath);

const dirReader = promisify(readdir);
const fileStatisticsGetter = promisify(stat);

export default router()(
  get("/info", getInfo, {
    db,
    send
  }),
  get("/list", getList, {
    db,
    dataFetcher,
    imagesPath,
    endpoint,
    send,
    dirReader,
    fileStatisticsGetter
  }),
  get("/img/*", handler, {
    public: "static/"
  })
);
