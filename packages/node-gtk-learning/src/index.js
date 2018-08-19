import { View, Orientation } from "./utils";
import { Label, Button, HeaderBar, Grid } from "./components";

// Initialize the window
const { view, window } = new View({
  title: "Note Manager",
  width: 1024,
  height: 600,
  position: "center"
});

// Create a layout
const grid = new Grid();

// Create and configure some components
const headerBar = new HeaderBar({ title: window.title });
headerBar.setShowCloseButton(true);

const createNewNoteButton = new Button();
createNewNoteButton.add(new Label({ label: "Create New Note" }));

const helloWorldLabel = new Label({ label: "Hello, world!" });

// Add the components to the layout
headerBar.add(createNewNoteButton);
grid.add(helloWorldLabel);

// Add the components to the window and view
window.add(grid);
window.setTitlebar(headerBar);

// Display the view
view.show();
