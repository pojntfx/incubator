const USERNAME_INPUT_SELECTOR = "#txtUser";
const PASSWORD_INPUT_SELECTOR = "#txtPass";
const CREDENTIALS_SUBMIT_BUTTON = "#divLoginBox > input";

const login = async (page, endpoint, username, password) => {
  await page.goto(endpoint);

  await page.click(USERNAME_INPUT_SELECTOR);
  await page.keyboard.type(username);

  await page.click(PASSWORD_INPUT_SELECTOR);
  await page.keyboard.type(password);

  await page.click(CREDENTIALS_SUBMIT_BUTTON);

  await page.waitForNavigation();
  await page.screenshot({ path: "dsbmobile.png" });
};

export { login };
