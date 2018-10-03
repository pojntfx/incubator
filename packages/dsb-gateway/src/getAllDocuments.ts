const ALL_PREVIEW_SELECTOR = "#content > div > div";
const PREVIEW_SELECTOR = "#content > div > div:nth-child(INDEX)";
const IMG_SELECTOR = "#slider > div > div:nth-child(1) > div > img";

const getAllPreviews = async page => {
  const amountOfDocuments = await page.evaluate(
    sel => document.querySelectorAll(sel).length,
    ALL_PREVIEW_SELECTOR
  );
  const imgSrcs = [];
  for (let i = 0; i++, i <= amountOfDocuments; ) {
    await page.click(PREVIEW_SELECTOR.replace("INDEX", i.toString()));
    const imgSrc = await page.evaluate(
      sel => document.querySelector(sel).getAttribute("src"),
      IMG_SELECTOR
    );
    imgSrcs.push(imgSrc);
  }
  return imgSrcs;
};

export { getAllPreviews };
