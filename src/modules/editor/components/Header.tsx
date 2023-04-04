import { NextPageContext, NextComponentType } from "next";
import { ImageConfig } from "@customTypes/configs";
import { Range, Toggle, ColorPicker } from "@components/index";
import { RefreshIcon } from "@heroicons/react/solid";
import clsx from "clsx";
interface HeaderProps {
  updateLayer: (newlayer: Partial<ImageConfig>) => void;
  layer: ImageConfig;
}
const Header: NextComponentType<NextPageContext, {}, HeaderProps> = ({
  updateLayer,
  layer,
}) => (
  <>
    <Toggle
      enabled={layer.header.show}
      setEnabled={(value) =>
        updateLayer({
          header: {
            ...layer.header,
            show: value,
          },
        })
      }
    >
      <p className="font-medium text-zinc-700 whitespace-nowrap">Show</p>
    </Toggle>
    <Toggle
      enabled={layer.header.anchored}
      setEnabled={(value) =>
        updateLayer({
          header: {
            ...layer.header,
            anchored: value,
          },
        })
      }
    >
      <p className="font-medium text-zinc-700 whitespace-nowrap">Anchored</p>
    </Toggle>
    <div className="space-y-2">
      <h1 className="block text-sm font-medium text-zinc-800 ">Title</h1>
      <input
        value={layer.header.content.title}
        onChange={(e) =>
          updateLayer({
            header: {
              ...layer.header,
              content: {
                ...layer.header.content,
                title: e.target.value,
              },
            },
          })
        }
        placeholder="An all-in-on tool fo..."
        type="text"
        className="flex text-center w-full justify-between items-center space-x-2 border border-zinc-200  text-zinc-800 bg-white  hover:bg-zinc-50 transition-all cursor-pointer bg p-3 rounded-lg font-medium "
      />
    </div>
    <div className="space-y-2">
      <h1 className="block text-sm font-medium text-zinc-800 ">Subtitle</h1>
      <input
        value={layer.header.content.subtitle}
        onChange={(e) =>
          updateLayer({
            header: {
              ...layer.header,
              content: {
                ...layer.header.content,
                subtitle: e.target.value,
              },
            },
          })
        }
        placeholder="Amazing features for..."
        type="text"
        className="flex text-center w-full justify-between items-center space-x-2 border border-zinc-200  text-zinc-800 bg-white  hover:bg-zinc-50 transition-all cursor-pointer bg p-3 rounded-lg font-medium "
      />
    </div>
    <div className="space-y-2">
      <h1 className="block text-sm font-medium text-zinc-800 ">Align</h1>
      <div className="flex space-x-2 rounded-xl bg-gray-100    p-1 max-w-4xl ">
        <button
          onClick={() =>
            updateLayer({
              header: {
                ...layer.header,
                align: "horizontal",
              },
            })
          }
          className={clsx(
            "flex w-full items-center justify-center rounded-lg py-2.5 text-center text-sm font-medium capitalize leading-5 space-x-1 ",
            "ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-400 focus:outline-none focus:ring-2 ",
            layer.header.align === "horizontal"
              ? "bg-white text-sky-700  shadow "
              : "text-gray-700 hover:bg-white/[0.12] hover:text-gray-600  "
          )}
        >
          <h1 className="">Horizontal</h1>
        </button>
        <button
          onClick={() =>
            updateLayer({
              header: {
                ...layer.header,
                align: "vertical",
              },
            })
          }
          className={clsx(
            "flex w-full items-center justify-center rounded-lg py-2.5 text-center text-sm font-medium capitalize leading-5 ",
            "ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-400 focus:outline-none focus:ring-2 ",
            layer.header.align === "vertical"
              ? "bg-white text-sky-700  shadow "
              : "text-gray-700 hover:bg-white/[0.12] hover:text-gray-600  "
          )}
        >
          <h1 className="">Vertical</h1>
        </button>
      </div>
    </div>

    <div className=" space-y-2">
      <label className="font-medium text-zinc-700">Color</label>
      <div className="flex justify-between items-center">
        <ColorPicker
          type="rgba"
          color={layer.header.content.color}
          setColor={(val) =>
            updateLayer({
              header: {
                ...layer.header,
                content: {
                  ...layer.header.content,
                  color: val,
                },
              },
            })
          }
        />

        <button
          onClick={() => {
            updateLayer({
              header: {
                ...layer.header,
                content: {
                  ...layer.header.content,
                  color: "rgba(0, 0, 0, 1)",
                },
              },
            });
          }}
          className="flex items-center justify-center space-x-2 border border-zinc-200 text-zinc-800  bg-white hover:bg-zinc-50 transition-all cursor-pointer p-3 rounded-lg font-medium"
        >
          <RefreshIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
    <Toggle
      enabled={layer.header.content.bold}
      setEnabled={(value) =>
        updateLayer({
          header: {
            ...layer.header,
            content: {
              ...layer.header.content,
              bold: value,
            },
          },
        })
      }
    >
      <p className="font-medium text-zinc-700 whitespace-nowrap">Bold</p>
    </Toggle>
    <Toggle
      enabled={layer.header.content.italic}
      setEnabled={(value) =>
        updateLayer({
          header: {
            ...layer.header,
            content: {
              ...layer.header.content,
              italic: value,
            },
          },
        })
      }
    >
      <p className="font-medium text-zinc-700 whitespace-nowrap">Italic</p>
    </Toggle>
    <Range
      step={0.1}
      showValues={false}
      value={layer.header.content.size}
      set={(val) =>
        updateLayer({
          header: {
            ...layer.header,
            content: {
              ...layer.header.content,
              size: val,
            },
          },
        })
      }
      min={50}
      max={300}
    >
      <div className="flex space-x-2 items-center">
        <p className=" font-medium text-zinc-700 whitespace-nowrap">Size</p>
        <button
          className="hover:text-zinc-400 transition-colors"
          onClick={() => {
            updateLayer({
              header: {
                ...layer.header,
                content: {
                  ...layer.header.content,
                  size: 100,
                },
              },
            });
          }}
        >
          <RefreshIcon className="h-4" />
        </button>
      </div>
    </Range>
    <Range
      step={0.1}
      showValues={false}
      value={layer.header.content.padding}
      set={(val) =>
        updateLayer({
          header: {
            ...layer.header,
            content: {
              ...layer.header.content,
              padding: val,
            },
          },
        })
      }
      min={-5}
      max={15}
    >
      <div className="flex space-x-2 items-center">
        <p className=" font-medium text-zinc-700 whitespace-nowrap">Padding</p>
        <button
          className="hover:text-zinc-400 transition-colors"
          onClick={() => {
            updateLayer({
              header: {
                ...layer.header,
                content: {
                  ...layer.header.content,
                  padding: 1,
                },
              },
            });
          }}
        >
          <RefreshIcon className="h-4" />
        </button>
      </div>
    </Range>
    {!layer.header.anchored && (
      <Range
        showValues={false}
        value={layer.header.content.translateX}
        set={(val) =>
          updateLayer({
            header: {
              ...layer.header,
              content: {
                ...layer.header.content,
                translateX: val,
              },
            },
          })
        }
        min={-100}
        max={100}
      >
        <div className="flex space-x-2 items-center">
          <p className=" font-medium text-zinc-700 whitespace-nowrap">X</p>
          <button
            className="hover:text-zinc-400 transition-colors"
            onClick={() => {
              updateLayer({
                header: {
                  ...layer.header,
                  content: {
                    ...layer.header.content,
                    translateX: 0,
                  },
                },
              });
            }}
          >
            <RefreshIcon className="h-4" />
          </button>
        </div>
      </Range>
    )}
  </>
);
export default Header;
