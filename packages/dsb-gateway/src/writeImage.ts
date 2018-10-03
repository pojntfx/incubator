import * as fs from "fs";
import * as https from "https";

const writeImage = async (imgSrc, filename) => {
  const file = fs.createWriteStream(`output/${filename}`);
  return https.get(imgSrc, response => response.pipe(file));
};

export { writeImage };
