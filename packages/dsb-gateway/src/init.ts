const init = async puppeteer => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  return {
    browser,
    page
  };
};

export { init };
