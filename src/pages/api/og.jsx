import { ImageResponse } from "@vercel/og";
import clsx from "clsx";
import { Toolbar } from "../../modules/editor/components/Frames";
export const config = {
  runtime: "experimental-edge",
};

const preset = {
  id: "preset1",
  name: "default",
  size: {
    scale: 80,
    dimensions: {
      aspectRatio: "16 / 9",
      width: 1920,
      height: 1080,
    },
  },
  orientation: {
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    perspective: 3000,
  },
  position: {
    x: 0,
    y: 0,
  },
  background: {
    type: "gradient",
    color: "#252525",
    gradient: {
      stops: [
        { color: "#cd96b3", id: "664" },
        { color: "#bda6f0", id: "356" },
      ],
      direction: 70,
    },
  },
  shadow: {
    color: "rgba(17, 12, 46, 0.15)",
    type: "xl",
    previewSize: "0px 5px 10px",
    size: "0px 50px 100px",
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
    show: true,
    placement: "bottom-right",
    theme: "light",
  },
};
const removeBackground = false;
export default function () {
  return new ImageResponse(
    (
      <div
        style={
          removeBackground
            ? {
                background: "transparent",
                aspectRatio: `auto ${preset.size.dimensions.aspectRatio}`,
              }
            : {
                backgroundImage:
                  preset.background.type === "gradient"
                    ? `linear-gradient(${
                        preset.background.gradient?.direction
                      }deg, ${preset.background.gradient?.stops
                        .map((item) => item.color)
                        .join(",")})`
                    : preset.background.color,
                aspectRatio: preset.size.dimensions.aspectRatio,
              }
        }
        tw="overflow-hidden relative flex w-full h-full items-center justify-center"
      >
        <div
          tw=" w-full h-full flex absolute bg-white"
          style={{ scale: preset.size.scale / 100 } }
        >
          <div
            style={{
              translate: `${(preset.position.x / 100) * 1920} ${(preset.position.y / 100) * 1080}`
      
            }}
            tw={
              (preset.header.align === "vertical"
                ? "flex-col"
                : "items-center") + " relative flex flex-1"
            }
          >
            {false && (
              <div
                style={{
                  translateX: (preset.header.content.translateX / 100) * 1920,
                  color: preset.header.content.color,
                  maxWidth:
                    preset.header.align === "horizontal"
                      ? true
                        ? `${1920 * 0.35}px`
                        : "30%"
                      : "100%",
                }}
                tw={
                  (preset.header.content.italic && " italic ") +
                  (preset.header.align === " horizontal "
                    ? " text-left "
                    : " text-center ") +
                  " space-y-2 flex flex-col "
                }
              >
                <h1
                  style={{
                    fontSize: true
                      ? `${1920 * 0.04 * (preset.header.content.size / 100)}px`
                      : "2rem",
                  }}
                  tw={preset.header.content.bold && "font-bold"}
                >
                  {preset.header.content.title}
                </h1>
                <p
                  style={{
                    fontSize: true
                      ? `${1920 * 0.02 * (preset.header.content.size / 100)}px`
                      : "1rem",
                  }}
                >
                  {preset.header.content.subtitle}
                </p>
              </div>
            )}

            <div
              tw="aspect-video relative flex flex-col flex-1 overflow-hidden "
              style={{
                // transform: `rotateX(${preset.orientation.rotateX}) rotateY(${preset.orientation.rotateY}) rotateZ(${preset.orientation.rotateZ}))`,
                
                transformPerspective: preset.orientation.perspective,
                boxShadow: `${preset.shadow.color} ${preset.shadow.size}`,
                borderRadius: `${0.037 * 1920 * preset.border.radius}px`,
                borderColor: preset.border.color,
                borderWidth: `${preset.border.width}px`,
                marginTop:
                  !preset.header.show || preset.header.align === "horizontal"
                    ? 0
                    : `${preset.header.content.padding}rem`,
                marginLeft:
                  !preset.header.show || preset.header.align === "vertical"
                    ? 0
                    : `${preset.header.content.padding}rem`,
              }}
            >
             
                
              
              <div tw={"relative flex-1 flex "}>
                <img
                  alt="editor image"
                  tw="w-full h-full"
                  src="https://i.imgur.com/cunoh2L.jpg"
                />
              </div>
            </div>
          </div>
        </div>

        
      </div>
    ),
    { width: 1920, height: 1080 }
  );
}
