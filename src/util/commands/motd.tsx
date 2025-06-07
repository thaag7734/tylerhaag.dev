import { Command } from "../cmd-handler";

// this might make more sense as a tfile, but it seems better to me semantically
// for it to be a command. perhaps i've been poisoned by minecraft
const motd: Command = {
  fn: () => {
    return {
      output: (
        <>
          <span role="heading" className="bold">Message of the Day</span><br/>
          <span>
            I&apos;m Tyler Haag, a software engineer who loves to create cool things.
            You can learn some more about me or view my projects by using the commands
            in this terminal interface.
          </span><br/>
          <br/>
          <span>This terminal uses some commands you may already be familiar with:</span><br/>
          <ul>
            <li>     <span className="bold">ls</span> : Lists files</li>
            <li>    <span className="bold">cat</span> : Prints the contents of files</li>
            <li>  <span className="bold">clear</span> : Clears the terminal output</li>
          </ul>
          <br/>
          <span>but also implements some commands of its own:</span><br/>
          <ul>
            <li>   <span className="bold">motd</span> : Displays this message</li>
            <li>
              {"   "}<span className="bold">help</span> : Provides help/usage information
              for commands
            </li>
            <li>
              {"    "}<span className="bold">nav</span> : Clears the terminal and
              prints the contents of one or more files (alias for{" "}
              <span className="bold">clear && cat</span>)
            </li>
          </ul>
          <br/>
          <span>
            Chaining is supported with the{" "}
            <span className="bold">&amp;&amp;</span> operator.
          </span><br/>
          <br/>
          <span>
            If you don&apos;t know where to start, try running
            {" "}<span className="bold">ls</span> and picking a file to
            {" "}<span className="bold">nav</span> to. For example:<br/>
            <span className="bold">nav about</span><br/>
            will &quot;navigate&quot; to my About Me page.
          </span><br/>
          <br/>
        </>
      ),
    };
  },
  usage: () => {
    return {
      output: (
        <>
          <span>Usage: motd</span><br/>
          <span>Displays the message of the day.</span><br/>
          <br/>
        </>
      ),
    }
  }
}

export default motd;
