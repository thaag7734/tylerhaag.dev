import { Command } from "../cmd-handler";
import cat from "./cat";
import clear from "./clear";
import help from "./help";

const COMMANDS: Record<string, Command> = {
  help,
  clear,
  cat,
}

export default COMMANDS;
