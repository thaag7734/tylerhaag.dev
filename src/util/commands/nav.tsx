import COMMANDS from ".";
import { Command } from "../cmd-handler";

const nav: Command = {
  fn: (args) => {
    return {
      output: COMMANDS.cat.fn(args).output,
      clear: true,
    }
  },
  usage: () => {
    return { 
      output: (
        <>
          <span>Usage: nav &lt;file&gt;</span><br/>
          <span>Alias for <span className="bold">clear && cat &lt;file&gt;</span></span><br/>
          <br/>
        </>
      ),
    }
  }
};

export default nav;
