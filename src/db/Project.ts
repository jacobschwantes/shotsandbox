import { Config } from "@customTypes/configs";

export interface Project {
    id?: number;
    name: string;
    date: number;
    config: Config;
  }

export interface Folder {
    id?: number;
    name: string;
    projects: number[];
  }
  