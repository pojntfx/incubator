import "markmap/style/view.mindmap.css";
import "markmap/lib/d3-flextree";
import markmap from "markmap/lib/view.mindmap";
import parse from "markmap/lib/parse.markdown";
import transform from "markmap/lib/transform.headings";
import Turndown from "turndown";
import { Base64 } from "js-base64";

const upsertQueryParameter = (key, value) =>
  window.location.hash.includes(`${key}=`)
    ? (window.location.hash = window.location.hash.replace(
        new RegExp(`(\\#|\\?)${key}=.+?(?=(\\?|$))`, "g"),
        `?${key}=${Base64.encode(value)}`
      ))
    : (window.location.hash += `?${key}=${Base64.encode(value)}`);

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash) {
    const sharedVisualization = window.location.hash
      .split("?visualization-input=")[1]
      .split("?")[0];
    console.log(sharedVisualization);
    if (sharedVisualization) {
      document.querySelector(
        "textarea#visualization-input"
      ).innerHTML = Base64.decode(sharedVisualization);
    }
  }
  document
    .querySelector("button#visualization-share-trigger")
    .addEventListener("click", () => {
      const { value } = document.querySelector("textarea#visualization-input");
      upsertQueryParameter("visualization-input", value);
      document.querySelector("div#visualization-notification").innerHTML =
        "Link to visualization copied to clipboard!";
      navigator.clipboard.writeText(window.location);
    });
  document
    .querySelector("button#visualization-trigger")
    .addEventListener("click", () => {
      const { value } = document.querySelector("textarea#visualization-input");
      const turndown = new Turndown();
      const input = transform(
        parse(turndown.turndown(value.replace(/\n.*> /g, " ")))
      );
      const output = document.querySelector("svg.visualization-output");
      output.innerHTML = "";
      output.setAttribute("style", "height: 100vh; width: 100%;");
      markmap("svg.visualization-output", input, {
        preset: "colorful"
      });
      output.scrollIntoView();
    });
});
