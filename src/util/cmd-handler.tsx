import { ReactNode } from "react";
import COMMANDS from "./commands";

export type CommandResult = {
  output: ReactNode,
  clear?: boolean,
}

export type Command = {
  fn: (args: string[]) => CommandResult,
  usage: () => CommandResult,
}

export const processCommand = (cmd: string): CommandResult => {
  const trimmed = cmd.trim();

  if (trimmed.length === 0) {
    return { output: null };
  }

  const tokens = trimmed.split(/\s+/);
  const cmdName = tokens[0];

  return (COMMANDS[cmdName]?.fn ?? (() => ({
    output: (
      <span>
        <span>Invalid command: {cmdName}</span><br/><br/>
        {COMMANDS["help"].fn([]).output}
      </span>
    ),
  })))(tokens.slice(1))
}
