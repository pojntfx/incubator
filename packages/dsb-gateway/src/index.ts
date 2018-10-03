import * as puppeteer from "puppeteer";
import { endpoint, username, password } from "./config.json";
import { login } from "./login";
import { init } from "./init";
import { getAllPreviews } from "./getAllDocuments";
import { writeImage } from "./writeImage";

(async () => {
  const { browser, page } = await init(puppeteer);

  await login(page, endpoint, username, password);

  const imgSrcs = await getAllPreviews(page);

  imgSrcs.map(
    async (imgSrc, index) => await writeImage(imgSrc, `${index}.jpg`)
  );

  await browser.close();
})();
