const getInfo = async (_, res, { db, send, enableCORS }) =>
  enableCORS(res).then(() =>
    send(res, 200, {
      lastFetchFromDSBDate: db.get("lastFetchFromDSBDate")
    })
  );

export { getInfo };
