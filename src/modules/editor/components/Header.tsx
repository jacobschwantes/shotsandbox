import { NextPageContext, NextComponentType } from "next";
import { Config } from "@customTypes/configs";
import { Range, Toggle, ColorPicker } from "@components/index";
import { RefreshIcon } from "@heroicons/react/solid";
import clsx from "clsx";
interface HeaderProps {
  updateConfig: (newConfig: Partial<Config>) => void;
  config: Config;
}
const Header: NextComponentType<NextPageContext, {}, HeaderProps> = ({
  updateConfig,
  config,
}) => (
  <>
    <Toggle
      enabled={config.header.show}
      setEnabled={(value) =>
        updateConfig({
          header: {
            ...config.header,
            show: value,
          },
        })
      }
    >
      <p className="font-medium text-zinc-300 whitespace-nowrap">Show</p>
    </Toggle>
    <Toggle
      enabled={config.header.anchored}
      setEnabled={(value) =>
        updateConfig({
          header: {
            ...config.header,
            anchored: value,
          },
        })
      }
    >
      <p className="font-medium text-zinc-300 whitespace-nowrap">Anchored</p>
    </Toggle>
    <div className="space-y-2">
      <h1 className="block text-sm font-medium text-zinc-100 ">Title</h1>
      <input
        value={config.header.content.title}
        onChange={(e) =>
          updateConfig({
            header: {
              ...config.header,
              content: {
                ...config.header.content,
                title: e.target.value,
              },
            },
          })
        }
        placeholder="An all-in-on tool fo..."
        type="text"
        className="appearance-none form-input focus:outline-none flex w-full justify-between items-center space-x-2 border border-zinc-800 hover:border-blue-500 text-zinc-200 bg-zinc-900 hover:bg-blue-900 bg-opacity-25 hover:bg-opacity-25 transition-all cursor-pointer bg py-2 px-4 rounded-lg"
      />
    </div>
    <div className="space-y-2">
      <h1 className="block text-sm font-medium text-zinc-100 ">Subtitle</h1>
      <input
        value={config.header.content.subtitle}
        onChange={(e) =>
          updateConfig({
            header: {
              ...config.header,
              content: {
                ...config.header.content,
                subtitle: e.target.value,
              },
            },
          })
        }
        placeholder="Amazing features for..."
        type="text"
        className="appearance-none form-input focus:outline-none flex w-full justify-between items-center space-x-2 border border-zinc-800 hover:border-blue-500 text-zinc-200 bg-zinc-900 hover:bg-blue-900 bg-opacity-25 hover:bg-opacity-25 transition-all cursor-pointer bg py-2 px-4 rounded-lg"
      />
    </div>
    <div className="space-y-2">
      <h1 className="block text-sm font-medium text-zinc-100 ">Align</h1>
      <div className="flex space-x-2 rounded-xl bg-gray-100 dark:bg-black dark:border dark:border-zinc-900 p-1 max-w-4xl ">
        <button
          onClick={() =>
            updateConfig({
              header: {
                ...config.header,
                align: "horizontal",
              },
            })
          }
          className={clsx(
            "flex w-full items-center justify-center rounded-lg py-2.5 text-center text-sm font-medium capitalize leading-5 space-x-1 ",
            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 dark:ring-transparent",
            config.header.align === "horizontal"
              ? "bg-white text-blue-700 dark:text-blue-500 shadow dark:bg-zinc-900"
              : "text-gray-700 hover:bg-white/[0.12] hover:text-gray-600 dark:hover:text-zinc-200 dark:text-zinc-300"
          )}
        >
          <h1 className="hidden sm:block">Horizontal</h1>
        </button>
        <button
          onClick={() =>
            updateConfig({
              header: {
                ...config.header,
                align: "vertical",
              },
            })
          }
          className={clsx(
            "flex w-full items-center justify-center rounded-lg py-2.5 text-center text-sm font-medium capitalize leading-5 ",
            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 dark:ring-transparent",
            config.header.align === "vertical"
              ? "bg-white text-blue-700 dark:text-blue-500 shadow dark:bg-zinc-900"
              : "text-gray-700 hover:bg-white/[0.12] hover:text-gray-600 dark:hover:text-zinc-200 dark:text-zinc-300"
          )}
        >
          <h1 className="hidden sm:block">Vertical</h1>
        </button>
      </div>
    </div>

    <div className=" space-y-2">
      <label className="font-medium text-zinc-300">Color</label>
      <div className="flex justify-between items-center">
        <ColorPicker
          type="rgba"
          color={config.header.content.color}
          setColor={(val) =>
            updateConfig({
              header: {
                ...config.header,
                content: {
                  ...config.header.content,
                  color: val,
                },
              },
            })
          }
        />

        <button
          onClick={() => {
            updateConfig({
              header: {
                ...config.header,
                content: {
                  ...config.header.content,
                  color: "rgba(0, 0, 0, 1)",
                },
              },
            });
          }}
          className="flex items-center justify-center space-x-2 border border-zinc-800 text-zinc-200 bg-zinc-900 hover:bg-zinc-800 bg-opacity-25 hover:bg-opacity-25 transition-all cursor-pointer bg p-2 rounded-lg"
        >
          <RefreshIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
    <Toggle
      enabled={config.header.content.bold}
      setEnabled={(value) =>
        updateConfig({
          header: {
            ...config.header,
            content: {
              ...config.header.content,
              bold: value,
            },
          },
        })
      }
    >
      <p className="font-medium text-zinc-300 whitespace-nowrap">Bold</p>
    </Toggle>
    <Toggle
      enabled={config.header.content.italic}
      setEnabled={(value) =>
        updateConfig({
          header: {
            ...config.header,
            content: {
              ...config.header.content,
              italic: value,
            },
          },
        })
      }
    >
      <p className="font-medium text-zinc-300 whitespace-nowrap">Italic</p>
    </Toggle>
    <Range
    step={0.01}
    showValues={false}
      value={config.header.content.size}
      set={(val) =>
        updateConfig({
          header: {
            ...config.header,
            content: {
              ...config.header.content,
              size: val,
            },
          },
        })
      }
      min={0}
      max={10}
    >
      <div className="flex space-x-2 items-center">
        <p className=" font-medium text-zinc-300 whitespace-nowrap">Size</p>
        <button
          className="hover:text-zinc-400 transition-colors"
          onClick={() => {
            updateConfig({
              header: {
                ...config.header,
                content: {
                  ...config.header.content,
                  size: 1,
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
      value={config.header.content.padding}
      set={(val) =>
        updateConfig({
          header: {
            ...config.header,
            content: {
              ...config.header.content,
              padding: val,
            },
          },
        })
      }
      min={-5}
      max={15}
    >
      <div className="flex space-x-2 items-center">
        <p className=" font-medium text-zinc-300 whitespace-nowrap">Padding</p>
        <button
          className="hover:text-zinc-400 transition-colors"
          onClick={() => {
            updateConfig({
              header: {
                ...config.header,
                content: {
                  ...config.header.content,
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
    {!config.header.anchored && (
      <Range
      showValues={false}
        value={config.header.content.translateX}
        set={(val) =>
          updateConfig({
            header: {
              ...config.header,
              content: {
                ...config.header.content,
                translateX: val,
              },
            },
          })
        }
        min={-100}
        max={100}
      >
        <div className="flex space-x-2 items-center">
          <p className=" font-medium text-zinc-300 whitespace-nowrap">
            X
          </p>
          <button
            className="hover:text-zinc-400 transition-colors"
            onClick={() => {
              updateConfig({
                header: {
                  ...config.header,
                  content: {
                    ...config.header.content,
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
