import * as puppeteer from "puppeteer";
import { endpoint, username, password } from "./config.json";
import { login } from "./login";
import { init } from "./init";
import { getImgSrcs } from "./getImgSrcs";
import { writeImage } from "./writeImage";
import { writeImages } from "./writeImages";

(async () => {
  const { browser, page } = await init(puppeteer);

  await login(page, endpoint, username, password);

  const imgSrcs = await getImgSrcs(page);

  await writeImages(imgSrcs, writeImage);

  await browser.close();
})();
