import { Folder, Project } from "@customTypes/configs";
import { toast } from "react-toastify";
import { db } from "..";
export const modifyFolder = async (
  folderId: number | undefined,
  modifiedParams: Partial<Folder>
) => {
  if (folderId) {
    try {
      await db.folders.update(folderId, modifiedParams);
      toast("Folder modified", { type: "success" });
    } catch (e) {
      toast("Something went wrong", { type: "error" });
      console.error(e);
    }
  }
};

export const modifyProject = async (
  projectId: number | undefined,
  modifiedParams: Partial<Project>
) => {
  if (projectId) {
    try {
      await db.projects.update(projectId, modifiedParams);
      toast("Project modified", { type: "success" });
    } catch (e) {
      toast("Something went wrong", { type: "error" });
      console.error(e);
    }
  }
};
