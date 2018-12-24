import { common } from "./common";
import pb from "../assets/pb-luis.jpg";

const luis = {
  head: {
    title: "Luis",
    description: "Information on Luis Pojtinger.",
    author: common.author,
    keywords: ["luis", "pojtinger", "ski jumping"],
    favicon: common.favicon,
    siteTitle: common.title,
    themeColor: common.color,
    lang: common.language
  },
  background: common.background,
  header: {
    img: pb,
    name: "Luis Pojtinger",
    handle: "luispojtinger",
    text: `Skijumping
PB: 132m
KTM
15/🇩🇪`,
    mail: "luis@pojtinger.com",
    follow: "https://www.instagram.com/luispojtinger/"
  },
  metadata: {
    location: "Baiersbronn, Baden-Württemberg, Germany, European Union",
    date: "2003-11-13"
  },
  links: [
    {
      title: "Instagram",
      img:
        "https://img.shields.io/badge/Instagram-%40luispojtinger-E4405F.svg?logo=instagram&style=social",
      link: "https://www.instagram.com/luispojtinger/",
      help: {
        title: "Instagram",
        text: "Quick and simple, multimedia-driven posts and stories.",
        docsLink: "https://www.instagram.com"
      }
    }
  ]
};

export { luis };
