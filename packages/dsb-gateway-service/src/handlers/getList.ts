import { getImageNames } from "../actions/getImageNames";

const getList = async (
  req,
  res,
  {
    db,
    dataFetcher,
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
      req.query.nocache
        ? await dataFetcher()
            .then(() => db.update("lastFetchFromDSBDate", new Date()).write())
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
            .catch(e => send(res, 400, `Could not get list of images: ${e}`))
        : await getImageNames(
            imagesPath,
            endpoint,
            dirReader,
            fileStatisticsGetter
          )
            .then(fileNamesWithStatistics =>
              send(res, 200, fileNamesWithStatistics)
            )
            .catch(e => send(res, 400, `Could not get list of images: ${e}`))
  );

export { getList };
