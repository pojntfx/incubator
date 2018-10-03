import * as fs from "fs";
import * as https from "https";

const writeImage = async (imgSrc, dir, filename) => {
  const file = fs.createWriteStream(dir + filename);
  return https.get(imgSrc, response => response.pipe(file));
};

export { writeImage };
