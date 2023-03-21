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
    }).catch((err) => {
      console.error(err.stack);
    });
  }
};
