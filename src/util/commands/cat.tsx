import { ReactNode } from "react";
import COMMANDS from ".";
import { Command } from "../cmd-handler";
import FILES from "../tfiles";

const cat: Command = {
  fn: (args) => {
    if (args.length < 1) {
      return {
        output: (
          <>
            <span>
              Not enough arguments: Command <span className="bold">cat</span>
              requires at least 1 argument.
            </span><br/><br/>
            {COMMANDS.help.fn(["cat"]).output}
          </>
        ),
      };
    }

    return {
      output: (
        <>
          {args.map((fName) => (FILES[fName] ?? (
            <>
              <span>
                [<span className="error">Error</span>]:
                File <span className="bold">{fName}</span> could not be found.
              </span><br/><br/>
            </>
          )) as ReactNode)}
        </>
      )
    };
  },
  usage: () => {
    return {
      output: (
        <>
          <span>Usage: cat &lt;file1&gt; [file2] [file3] ...</span><br/><br/>
          <span>Concatenates files to the terminal output.</span><br/><br/>
        </>
      ),
    };
  }
}

export default cat;
