const login = async (page, endpoint, username, password) => {
  await page.goto(endpoint);
  await page.screenshot({ path: "dsbmobile.png" });
};

export { login };
