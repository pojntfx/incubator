import { common } from "./common";
import pb from "../assets/pb-nette.jpg";

const nette = {
  head: {
    title: "Nette",
    description: "Information on Nette Pojtinger.",
    author: common.author,
    keywords: ["nette", "pojtinger", "mother"],
    favicon: common.favicon,
    siteTitle: common.title,
    themeColor: common.color,
    lang: common.language
  },
  background: common.background,
  header: {
    img: pb,
    name: "Annette Pojtinger",
    handle: "an.nette.pojtinger",
    text: ``,
    mail: "nette@pojtinger.com",
    follow: "https://www.instagram.com/an.nette.pojtinger/"
  },
  metadata: {
    location: "Baiersbronn, Baden-Württemberg, Germany, European Union",
    date: "1972-03-01"
  },
  links: [
    {
      title: "Instagram",
      img:
        "https://img.shields.io/badge/Instagram-%40an%2enette%20epojtinger-E4405F.svg?logo=instagram&style=social",
      link: "https://www.instagram.com/an.nette.pojtinger/",
      help: {
        title: "Instagram",
        text: "Quick and simple, multimedia-driven posts and stories.",
        docsLink: "https://www.instagram.com"
      }
    },
    {
      title: "Facebook",
      img:
        "https://img.shields.io/badge/Facebook-%40annette%2epojtinger-3b5998.svg?logo=facebook&style=social",
      link: "https://www.facebook.com/annette.pojtinger",
      help: {
        title: "Facebook",
        text: "The traditional social network.",
        docsLink: "https://www.facebook.com"
      }
    }
  ]
};

export { nette };
