import { getImageNames } from "../actions/getImageNames";

const getList = async (
  req,
  res,
  {
    db,
    dataFetcher,
    authenticator,
    imagesPath,
    endpoint,
    send,
    dirReader,
    fileStatisticsGetter,
    enableCORS
  }
) =>
  enableCORS(res).then(
    async () =>
      req.query.username && req.query.password
        ? authenticator(endpoint, req.query.username, req.query.password)
          ? req.query.nocache
            ? await dataFetcher(req.query.username, req.query.password)
                .then(() =>
                  db.update("lastFetchFromDSBDate", new Date()).write()
                )
                .then(
                  async () =>
                    await getImageNames(
                      imagesPath,
                      endpoint,
                      dirReader,
                      fileStatisticsGetter
                    )
                )
                .then(fileNamesWithStatistics =>
                  send(res, 200, fileNamesWithStatistics)
                )
                .catch(e =>
                  send(res, 400, `Could not get list of images: ${e}`)
                )
            : await getImageNames(
                imagesPath,
                endpoint,
                dirReader,
                fileStatisticsGetter
              )
                .then(fileNamesWithStatistics =>
                  send(res, 200, fileNamesWithStatistics)
                )
                .catch(e =>
                  send(res, 400, `Could not get list of images: ${e}`)
                )
          : send(res, 403, "Wrong credentials")
        : send(res, 403, "Missing credentials!")
  );

export { getList };
