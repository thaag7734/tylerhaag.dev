import { Command } from "../cmd-handler";

const clear: Command = {
  fn: () => {
    return { output: null, clear: true }
  },
  usage: () => {
    return {
      output: (
        <>
          <span>Usage: clear</span>
          <br/><br/>
          <span>Clears the terminal</span>
          <br/><br/>
        </>
      ),
    };
  },
};

export default clear;
