import {
  puppeteer,
  init,
  login,
  endpoint,
  username,
  password,
  getImgSrcs,
  writeImage,
  writeImages
} from "./index";

(async () => {
  const { browser, page } = await init(puppeteer);

  await login(page, endpoint, username, password);

  const imgSrcs = await getImgSrcs(page);

  await writeImages(imgSrcs, "output/", writeImage);

  await browser.close();
})();
