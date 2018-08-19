import { App } from "./utils";
import { Label } from "./components";

// Initialize the window
const { window, canvas } = new App({
  width: 200,
  height: 80
});

// Create some components
const helloWorldLabel = new Label({ label: "Hello, world!" });

// Add the components to the window
canvas.add(helloWorldLabel);

// Display the window
window.show();
