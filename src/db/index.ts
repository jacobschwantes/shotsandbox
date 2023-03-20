import Dexie, { Table } from "dexie";
import { Folder, Project } from "./Project";
class ProjectsDB extends Dexie {
  folders!: Table<Folder>;
  projects!: Table<Project>;

  constructor() {
    super("projectsDB");
    this.version(3).stores({
      folders: `
        ++id,
        name`,
      projects: `
        ++id,
        name`,
    });
  }
}

export const db = new ProjectsDB();
db.on("populate", function () {
  // Init your DB with some default statuses:
  db.folders.add({
    id: 1,
    name: "Folder 1",
    projects: [1]
  });
  db.projects.add({
    id: 1,
    name: "Project 1",
    date: Date.now(),     
      config: {
        id: "config5",
        preview: "preset_5.png",
        name: "default",
        size: {
          scale: 88,
          dimensions: {
            aspectRatio: "1 / 1",
            width: 1080,
            height: 1080,
          },
        },
        orientation: {
          rotateX: 4,
          rotateY: -29,
          rotateZ: 12,
          perspective: 976,
        },
        position: {
          x: -12,
          y: 18,
        },
        background: {
          type: "gradient",
          color: "#252525",
          gradient: {
            stops: [
              { color: "#ffffff", id: 1 },
              { color: "#eda5f0", id: 2 },
              { color: "#959dcc", id: 3 },
              { color: "#ffffff", id: 4 },
            ],
            direction: 190,
          },
        },
        shadow: {
          color: "rgba(17, 12, 46, 0.2)",
          type: "2xl",
          previewSize: "0px 10px 20px",
          size: "0px 100px 200px",
        },
        border: {
          radius: 0.8,
          width: 0,
          color: "rgba(0, 0, 0, 1)",
        },
        header: {
          show: false,
          anchored: false,
          align: "vertical",
          content: {
            title: "The best image editing tool for founders",
            subtitle: "Turn boring screenshots into stunning graphics",
            color: "rgba(255, 255, 255, 1)",
            bold: true,
            italic: false,
            size: 3.5,
            padding: 5,
            translateX: 0,
          },
        },
        frame: {
          show: true,
          dark: false,
          opacity: 0.3,
          buttons: {
            show: true,
            dark: true,
            solid: true,
          },
          searchBar: {
            show: true,
          },
        },
        watermark: {
          show: false,
          placement: "bottom-right",
          theme: "light",
        },
      },
  });
});
