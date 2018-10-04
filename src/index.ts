import { send } from "micro";
import { router, get } from "micro-fork";
import { fetchDataFromDSB } from "./handlers/fetchDataFromDSB";
import * as query from "micro-query";

const state = {
  lastFetchFromDSBDate: new Date(0)
};

const fetchUpdates = async (req, res) =>
  query(req).nocache
    ? await fetchDataFromDSB()
        .then(() => (state.lastFetchFromDSBDate = new Date()))
        .then(() =>
          send(res, 200, { lastFetchFromDSBDate: state.lastFetchFromDSBDate })
        )
    : send(res, 200, { lastFetchFromDSBDate: state.lastFetchFromDSBDate });

export default router()(get("/info", fetchUpdates));
