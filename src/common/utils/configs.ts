import { Project } from "@customTypes/configs";
export const defaultProject: Project = {
    name: "Default Project",
    preview: "preset_5.png",
    last_modified: Date.now(),
    created_at: Date.now(),
    config: {
      size: {
        scale: 88,
        dimensions: {
          aspectRatio: "1 / 1",
          width: 1080,
          height: 1080,
        },
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
      layers: [
        {
          id: "img1",
          name: "taxpal.jpeg",
          type: "image",
          properties: {
            src: "/sample.jpeg",
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
                title: "The best way to level up your brand",
                subtitle:
                  "Transform bland images into stunning marketing content",
                color: "rgba(255, 255, 255, 1)",
                bold: true,
                italic: false,
                size: 150,
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
        },
      ],
    },
  };