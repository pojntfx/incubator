import { send } from "micro";
import { router, get } from "micro-fork";
import { fetchImagesFromDSB } from "./actions/fetchImagesFromDSB";
import { startDatabase } from "./utils/db";
import { updateList } from "./handlers/updateList";
import * as low from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import { dsb, imagesPath, dbFilePath } from "./config.json";

const db = startDatabase(dbFilePath, low, FileSync);
const dataFetcher = () =>
  fetchImagesFromDSB(dsb.endpoint, dsb.username, dsb.password, imagesPath);

export default router()(
  get("/info", updateList, {
    db,
    dataFetcher,
    send
  })
);
