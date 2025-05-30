import { ReactNode } from "react";

type CommandResult = {
  output: ReactNode,
  clear?: boolean,
}

type Command = {
  fn: (args: string[]) => CommandResult,
  usage: () => CommandResult,
}

const COMMANDS: Record<string, Command> = {
  help: {
    fn: (args) => {
      if (args.length > 1) {
        return {
          output: (
            <span>Too many arguments: command <b>help</b> accepts 0-1 arguments</span>
          ),
        };
      } else if (args.length === 1) {
        return COMMANDS[args[0]]?.usage() ?? {
          output: (
            <span>
              <span>Invalid command: {args[0]}</span><br/><br/>
              {COMMANDS["help"].fn([]).output}
            </span>
          ),
        };
      }

      return {
        output: (
          <>
            <span>Valid commands:</span><br/>
            {(() => {
              const cmdNames = Object.keys(COMMANDS).sort();

              return (
                <span>
                  {cmdNames.map((cmdName, idx) => (
                      <span key={cmdName}>{cmdName}{
                        (idx !== cmdNames.length - 1)
                          ? ", "
                          : ""
                      }</span>
                  ))}
                  <br/>
                </span>
              );
            })()}
            <br/>
            <span>
              Use <b>help &lt;command&gt;</b> to see detailed usage for a specific command.
            </span>
            <br/><br/>
          </>
        ),
      };
    },
    usage: () => {
      return {
        output: (
          <>
            <span>Usage: help &lt;command&gt;</span>
          </>
        ),
      }
    },
  },
  clear: {
    fn: () => {
      return { output: null, clear: true }
    },
    usage: () => {
      return {
        output: (
          <>
            <span>Usage: clear</span>
            <span>Clears the terminal</span>
          </>
        ),
      };
    },
  }
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
