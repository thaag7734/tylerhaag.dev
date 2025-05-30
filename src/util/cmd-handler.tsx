import { ReactNode } from "react";

type CommandResult = {
  output: ReactNode,
  clear?: boolean,
}

const COMMANDS = {
  help: (): CommandResult => {
    return {
      output: (
        <>
          <span>Valid commands:</span><br/>
          {(() => {
            const cmdNames = Object.keys(COMMANDS).sort();

            return (
              <>
                {cmdNames.map((cmdName, idx) => (
                  <>
                    <span>{cmdName}{
                      (idx !== cmdNames.length - 1)
                        ? ", "
                        : ""
                    }</span>
                  </>
                ))}
                <br/>
              </>
            );
          })()}
          <br/>
          <span>Use <b>help &lt;command&gt;</b> to see detailed usage for a specific command.</span>
          <br/><br/>
        </>
      ),
    };
  },
  clear: (): CommandResult => {
    return { output: null, clear: true }
  }
}

export const processCommand = (cmd: string): CommandResult => {
  const trimmed = cmd.trim();

  if (trimmed.length === 0) {
    return { output: null };
  }

  const tokens = trimmed.split(/\s+/);
  const cmdName = tokens[0];

  return (COMMANDS[cmdName as keyof(typeof COMMANDS)] ?? (() => ({
    output: (
      <>
        <span>Invalid command: {cmdName}</span><br/><br/>
        {COMMANDS["help"]().output}
      </>
    ),
  })))()
}
