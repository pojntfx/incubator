import { puppeteer, init, login } from "@pojntfx-incubator/dsb-gateway-core";

const isLoggedIn = async (endpoint, username, password) =>
  await init(puppeteer).then(async ({ page }) => {
    try {
      return await login(page, endpoint, username, password);
    } catch (e) {
      return false;
    }
  });

export { isLoggedIn };
