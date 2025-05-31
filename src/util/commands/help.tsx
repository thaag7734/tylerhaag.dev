import { type Command } from "../cmd-handler";
import COMMANDS from "./index";

const help: Command = {
  fn: (args) => {
    if (args.length > 1) {
      return {
        output: (
          <span>Too many arguments: command <span className="bold">help</span> accepts 0-1 arguments</span>
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
            Use <span className="bold">help [command]</span> to see detailed usage for a specific command.
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
          <br/><br/>
          <span>Lists all valid commands. When &lt;command&gt; is provided, shows the help text for &lt;command&gt;.</span>
          <br/><br/>
        </>
      ),
    }
  },
};

export default help;
