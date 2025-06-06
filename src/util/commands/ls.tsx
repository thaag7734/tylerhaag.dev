import { Command } from "../cmd-handler";
import FILES from "../tfiles";

const ls: Command = {
  fn: () => {
    return {
      output: (
        <>
          <span role="heading">Available files:</span><br/>
          {Object.keys(FILES).map((fileName) => (
            <>
              <span key={fileName}>{fileName}</span><br/>
            </>
          ))}
          <br/>
        </>
      )
    }
  },
  usage: () => {
    return {
      output: (
        <>
          <span>Usage: ls</span><br/>
          <span>
            Lists all files available for use by other commands.
          </span><br/>
          <br/>
        </>
      )
    }
  }
};

export default ls;
