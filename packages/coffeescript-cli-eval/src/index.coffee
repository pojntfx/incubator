import { Command, flags } from "@oclif/command"

###
I cannot get this to work.
TypeError: Class constructor Command cannot be invoked without 'new'
###

class CLI extends Command
  run: ->
    # { flags } = @parse Example
    # name = flags.name or "world"
    @log "Hello Test!"

CLI.description = """
Describe the command here

Extra documentation goes here
"""

CLI.flags =
  version: flags.version { char: "v" }
  help: flags.help { char: "h" }
  name: flags.string { char: "n" }, description: "Name to print"

export CLI