import * as fs from "fs";

const getImageNames = async (imagesPath, res, send) => {
  await fs.readdir(imagesPath, (_, files) => {
    try {
      send(
        res,
        200,
        files.map(file => ({
          path: file
        }))
      );
    } catch (e) {
      send(res, 400, "Could not get list of images");
    }
  });
};

export { getImageNames };
