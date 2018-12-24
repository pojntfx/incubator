import logo from "../assets/logo.png";
import { about } from "./about";
import { home } from "./home";
import { michael } from "./michael";
import { nette } from "./nette";
import { toni } from "./toni";
import { luis } from "./luis";
import { felicitas } from "./felicitas";
import { login } from "./login";
import { common } from "./common";

const navbar = {
  brand: {
    title: common.title,
    img: logo,
    link: "/",
    help: {
      title: common.title,
      text:
        "Simple Frontend for @pojntfx-incubator/social-media-feeds-gateway.",
      docsLink: `${common.site}/docs`
    }
  },
  firstItems: [
    {
      title: about.head.title,
      icon: "info",
      link: "/about",
      help: {
        title: about.head.title,
        text: about.head.description,
        docsLink: `${common.site}/docs/app`
      }
    }
  ],
  startItems: [
    {
      title: home.head.title,
      link: "/home",
      icon: "home",
      help: {
        title: home.head.title,
        text: home.head.description,
        docsLink: `${common.site}/docs/app/home`
      }
    },
    {
      title: michael.head.title,
      link: "/michael",
      icon: "slideshare",
      help: {
        title: michael.head.title,
        text: michael.head.description,
        docsLink: `${common.site}/docs/app/michael`
      }
    },
    {
      title: nette.head.title,
      link: "/nette",
      icon: "paint brush",
      help: {
        title: nette.head.title,
        text: nette.head.description,
        docsLink: `${common.site}/docs/app/nette`
      }
    }
  ],
  endItems: [
    {
      title: toni.head.title,
      link: "/toni",
      icon: "tree",
      help: {
        title: toni.head.title,
        text: toni.head.description,
        docsLink: `${common.site}/docs/app/toni`
      }
    },
    {
      title: luis.head.title,
      link: "/luis",
      icon: "snowflake",
      help: {
        title: luis.head.title,
        text: luis.head.description,
        docsLink: `${common.site}/docs/app/luis`
      }
    },
    {
      title: felicitas.head.title,
      link: "/felicitas",
      icon: "code",
      help: {
        title: felicitas.head.title,
        text: felicitas.head.description,
        docsLink: `${common.site}/docs/app/felicitas`
      }
    }
  ],
  lastItems: [
    {
      title: login.head.title,
      icon: "sign-in",
      link: "/login",
      help: {
        title: login.head.title,
        text: login.head.description,
        docsLink: `${common.site}/docs/login`
      }
    }
  ]
};

export { navbar };
