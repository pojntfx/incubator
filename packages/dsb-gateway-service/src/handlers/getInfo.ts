const getInfo = async (_, res, { db, send }) =>
  await send(res, 200, {
    lastFetchFromDSBDate: db.get("lastFetchFromDSBDate")
  });

export { getInfo };
