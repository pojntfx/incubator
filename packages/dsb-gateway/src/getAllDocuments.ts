const ALL_PREVIEW_SELECTOR = "#content > div > div";
const PREVIEW_SELECTOR = "#content > div > div:nth-child(INDEX)";
const CLOSE_PREVIEW_SELECTOR = "#close-btn > img";
const ALL_IMG_SELECTOR = "#slider > div > div > div > img";
const IMG_SELECTOR = "#slider > div > div:nth-child(1) > div > img";

const getAmountOfDocuments = async page =>
  await page.evaluate(
    sel => document.querySelectorAll(sel).length,
    ALL_PREVIEW_SELECTOR
  );

const getAmountOfSubDocuments = async page => {
  await page.click(PREVIEW_SELECTOR.replace("INDEX", "1"));
  return await page.evaluate(
    sel => document.querySelectorAll(sel).length,
    ALL_IMG_SELECTOR
  );
};

const getDocumentUrls = async (page, amountOfDocuments) => {
  const imgSrcs = [];

  for (let i = 1; i++; i < amountOfDocuments) {
    try {
      await page.click(PREVIEW_SELECTOR.replace("INDEX", String(i - 1)));

      const imgSrc = await page.evaluate(
        sel => document.querySelector(sel).getAttribute("src"),
        IMG_SELECTOR
      );
      imgSrcs.push(imgSrc);
      await page.click(CLOSE_PREVIEW_SELECTOR);
    } catch (e) {
      return imgSrcs;
    }
  }

  return imgSrcs;
};

const getAllPreviews = async page => {
  return await getDocumentUrls(page, await getAmountOfDocuments(page));
};

export { getAllPreviews };
