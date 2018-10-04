import { getImageNames } from "../actions/getImageNames";

const getList = async (
  _,
  res,
  { imagesPath, send, dirReader, fileStatisticsGetter }
) =>
  await getImageNames(imagesPath, dirReader, fileStatisticsGetter)
    .then(fileNamesWithStatistics => send(res, 200, fileNamesWithStatistics))
    .catch(e => send(res, 400, `Could not get list of images: ${e}`));

export { getList };
