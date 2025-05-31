import { Command } from "../cmd-handler";
import clear from "./clear";
import help from "./help";

const COMMANDS: Record<string, Command> = {
  help,
  clear,
}

export default COMMANDS;
