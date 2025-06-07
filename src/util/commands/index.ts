import { Command } from "../cmd-handler";
import cat from "./cat";
import clear from "./clear";
import help from "./help";
import ls from "./ls";
import motd from "./motd";
import nav from "./nav";

const COMMANDS: Record<string, Command> = {
  help,
  clear,
  cat,
  ls,
  motd,
  nav,
}

export default COMMANDS;
