import { Project } from "../Project";
import { db } from "..";
export const duplicate = async (
  folderId: number | undefined,
  project: Project,
  name: string
) => {
  if (folderId) {
    try {
      const { id, ...properties } = project;
      const result = await db.projects.add({ ...properties, name });
      await db.folders
        .where("id")
        .equals(folderId)
        .modify((x) => x.projects.push(result as number));
    } catch (e) {
      console.error(e);
    }
  }
};
export const insertFolder = async (name: string) => {
  return await db.folders.add({ name, projects: [] });
};
