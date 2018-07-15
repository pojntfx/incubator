module.exports = {
  title: "Hello, World",
  locales: {
    "/": { lang: "en-US" },
    "/de/": { lang: "de-DE" }
  },
  serviceWorker: true,
  themeConfig: {
    nav: [{ text: "Another page", link: "/awesome-page.html" }],
    sidebar: ["/", "/awesome-page.html"]
  }
};
