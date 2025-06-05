import { Command } from "../cmd-handler";
import cat from "./cat";
import clear from "./clear";
import help from "./help";
import ls from "./ls";

const COMMANDS: Record<string, Command> = {
  help,
  clear,
  cat,
  ls,
}

export default COMMANDS;
