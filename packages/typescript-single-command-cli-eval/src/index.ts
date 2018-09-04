import { Command, flags } from "@oclif/command";
import { loadFile } from "./utils";
const { version, help } = flags;

/**
 * Main command
 */
class Main extends Command {
  static description = `Parse YAML into JSON.`;

  static flags = {
    version: version({ char: "v" }),
    help: help({ char: "h" })
  };

  static args = [
    {
      name: "file"
    }
  ];

  async run() {
    const {
      args: { file }
    } = super.parse(Main);

    if (file) {
      console.log(JSON.stringify(loadFile(file), null, 2));
    } else {
      super.warn("Please provide a YAML file to parse.");
    }
  }
}

export { Main };
