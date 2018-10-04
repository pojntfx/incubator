const updateList = async (req, res, { db, dataFetcher, send }) =>
  req.query.nocache
    ? await dataFetcher()
        .then(() => db.update("lastFetchFromDSBDate", new Date()).write())
        .then(({ lastFetchFromDSBDate }) =>
          send(res, 200, { lastFetchFromDSBDate })
        )
    : send(res, 200, {
        lastFetchFromDSBDate: db.get("lastFetchFromDSBDate")
      });

export { updateList };
