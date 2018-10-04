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
} from "@pojntfx-incubator/dsb-gateway-core";

const fetchImagesFromDSB = async imagesPath =>
  await init(puppeteer)
    .then(async ({ page, ...rest }) => {
      await login(page, endpoint, username, password);
      return { page, ...rest };
    })
    .then(async ({ page, ...rest }) => {
      const imgSrcs = await getImgSrcs(page);
      return {
        imgSrcs,
        ...rest
      };
    })
    .then(async ({ imgSrcs, ...rest }) => {
      await writeImages(imgSrcs, imagesPath, writeImage);
      return { ...rest };
    })
    .then(async ({ browser }) => await browser.close());

export { fetchImagesFromDSB };
