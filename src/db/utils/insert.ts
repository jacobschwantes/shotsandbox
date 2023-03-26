import { Project } from "@customTypes/configs";
import { toast } from "react-toastify";
import { db } from "..";
export const duplicate = async (
  folderId: number | undefined,
  projectId: number | undefined
) => {
  if (folderId && projectId) {
    try {
      const project = await db.projects.get(projectId);
      if (!project) {
        toast("Something went wrong", { type: "error" });
        return;
      }
      const {id, ...rest} = project;
      const count = await db.projects.where("name").startsWith(project.name).count();
      const result = await db.projects.add({ ...rest, name: `${project.name} (${count + 1})` });
      await db.folders
        .where("id")
        .equals(folderId)
        .modify((x) => x.projects.push(result as number));
      toast("Project duplicated", { type: "success" });
    } catch (e) {
      toast("Something went wrong", { type: "error" });
      console.error(e);
    }
  }
};
export const insertFolder = async (name: string) => {
  try {
    await db.folders.add({ name, projects: [] });
    toast("Folder created", { type: "success" });
  } catch (e) {
    toast("Something went wrong", { type: "error" });
    console.error(e);
  }
};

export const insertProject = async (
  project: Project,
  folderId: number | undefined
) => {
  if (folderId && project) {
    try {
      const result = await db.projects.add(project);
      await db.folders
        .where("id")
        .equals(folderId)
        .modify((x) => x.projects.push(result as number));
      toast("Project created", { type: "success" });
    } catch (e) {
      toast("Something went wrong", { type: "error" });
      console.error(e);
    }
  }
};
