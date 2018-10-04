import { getImageNames } from "../actions/getImageNames";

const getList = async (_, res, { imagesPath, send }) =>
  await getImageNames(imagesPath, res, send);

export { getList };
