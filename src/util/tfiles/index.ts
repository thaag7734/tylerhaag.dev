import { ReactNode } from "react";
import about from "./about";
import contact from "./contact";
import projects from "./projects";
import resume from "./resume";

const FILES: Record<string, ReactNode> = {
  about,
  contact,
  projects,
  resume,
}

export default FILES;
