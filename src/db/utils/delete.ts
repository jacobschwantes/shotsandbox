import { toast } from "react-toastify";
import { db } from "..";
export const deleteDb = () => {
  db.delete();
};
export const deleteProject = async (
  folderId: number | undefined,
  projectId: number | undefined
) => {
  if (folderId && projectId) {
    db.transaction("rw", db.projects, db.folders, async () => {
      await db.projects.delete(projectId);
      await db.folders
        .where("id")
        .equals(folderId)
        .modify((x) => {
          x.projects = x.projects.filter((item) => item !== projectId);
        });
        toast("Project deleted", { type: "success" });
    }).catch((err) => {
      toast("Something went wrong", { type: "error" });
      console.error(err.stack);
    });
  }
};

export const deleteFolder = async (folderId: number | undefined) => {
  if (folderId) {
    db.transaction("rw", db.folders, db.projects, async () => {
      const folderCount = await db.folders.count();
      if (folderCount === 1) {
        toast("You can't delete the last folder", { type: "error" });
        return;
      }
      const folder = await db.folders.get(folderId);
      if (folder && folder?.projects.length > 0) {
        await db.projects.bulkDelete(folder.projects);
      }
      await db.folders.delete(folderId);
      toast("Folder deleted", { type: "success" });
    }).catch((err) => {
      toast("Something went wrong", { type: "error" });
      console.error(err.message);
    });
  }
};
