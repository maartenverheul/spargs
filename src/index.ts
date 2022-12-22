type CommandOptions = {
  onAutocomplete: (args: any[]) => string,
  onExecute: (args: any[]) => any
}

class Command {

  public readonly name: string;
  public commands: {[name: string]: Command} = {};
  public arguments: {[name: string]: Argument} = {};
  public options: CommandOptions;

  constructor(name: string, options: CommandOptions) {
    this.name = name;
    this.options = options;
  }

  command(name: string, options: CommandOptions): Command {
    var command = new Command(name, options);
    if(this.commands.hasOwnProperty(name)) throw Errors.CommandExistsError(name);
    this.commands[name] = command;
    return this;
  }

  argument(name: string, options: ArgumentOptions): Command {
    var argument = new Argument(this, options);
    if(this.commands.hasOwnProperty(name)) throw Errors.ArgumentExistsError(name, this.name);
    this.arguments[name] = argument;
    return this;
  }
}

type ArgumentOptions = {
  onAutocomplete: (args: any[]) => string,
  onExecute: (args: any[]) => any,
  optional: boolean
}

class Argument {

  public readonly command: Command;
  public readonly options: ArgumentOptions;

  constructor(command: Command, options: ArgumentOptions) {
    this.command = command;
    this.options = options;
  }

}

class Errors {

  public static readonly CommandExistsError: (name: string) => Error = (name) => new Error(`Command "${name}" already exists`);
  public static readonly ArgumentExistsError: (argName: string, cmdName: string) => Error = (argName, cmdName) => new Error(`Argument "${argName}" already exists on command "${cmdName}"`);

}

class Spargs {

  public commands: {[name: string]: Command} = {};

  /// GENERATION OPTIONS COMMANDS
  
  command(name: string, options: CommandOptions): Spargs {
    var command = new Command(name, options);
    if(this.commands.hasOwnProperty(name)) throw Errors.CommandExistsError(name);
    this.commands[name] = command;
    return this;
  }

  /// EXECTION COMMANDS

  parse(input: string): any {
    console.log(input);
  }

  autocomplete(input: string): string {
    return "";
  }

}

(window as any).Spargs = Spargs;