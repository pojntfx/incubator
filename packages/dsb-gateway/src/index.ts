import * as puppeteer from "puppeteer";
import { endpoint, username, password } from "./config.json";
import { login } from "./login";
import { init } from "./init";

(async () => {
  const { browser, page } = await init(puppeteer);

  await login(page, endpoint, username, password);

  await browser.close();
})();
