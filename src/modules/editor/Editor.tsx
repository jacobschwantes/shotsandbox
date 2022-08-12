import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import clsx from "clsx";
import { toPng, toJpeg, toBlob } from "html-to-image";
import { FastAverageColor } from "fast-average-color";
import Toolbar, { PreviewToolbar } from "./components/Toolbar";
import ColorPicker from "./components/ColorPicker";
import { motion, AnimatePresence } from "framer-motion";
import List from "./components/DragList";
import { uniqueId } from "lodash";
import {
  BookmarkAltIcon,
  CollectionIcon,
  ColorSwatchIcon,
  CubeTransparentIcon,
  DesktopComputerIcon,
  DownloadIcon,
  LocationMarkerIcon,
  PhotographIcon,
  ReplyIcon,
  SunIcon,
  TemplateIcon,
  DuplicateIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import { toast } from "react-toastify";
import {
  CameraIcon,
  ChevronUpIcon,
  RefreshIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { RangeSlider } from "./components/RangeSlider";
import type {
  ImageDoc,
  ShadowConfig,
  FrameConfig,
  Config,
} from "@customTypes/EditorConfigs";
import Toggle from "./components/Toggle";
import Tooltip from "@components/Tooltip";
import Popover from "./components/Popover";
import { Disclosure } from "@headlessui/react";
const generateColorHex = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
const fac = new FastAverageColor();
const getColor = () => {
  const index = Math.floor(Math.random() * images.length);
  fac
    .getColorAsync(images[index], { ignoredColor: [255, 0, 100, 255, 5] })
    .then((color) => {
      return color.hex;
    })
    .catch((e) => {
      console.log(e);
    });
};
const images = [
  "response.jpeg",
  "response2.jpeg",
  "response3.jpeg",
  "response5.jpeg",
];
const generalNavigation = [
  {
    id: 1,
    name: "Presets",
    href: "/",
    icon: CollectionIcon,
  },
  {
    id: 2,
    name: "Images",
    icon: PhotographIcon,
  },
  {
    id: 3,
    name: "Position",
    href: "/tokens",
    icon: LocationMarkerIcon,
  },
  {
    id: 4,
    name: "3D",
    href: "/settings/account",
    icon: CubeTransparentIcon,
  },
  {
    id: 5,
    name: "Layout",
    href: "/tokens",
    icon: TemplateIcon,
  },
  {
    id: 6,
    name: "Background",
    href: "/history",
    icon: ColorSwatchIcon,
  },
  {
    id: 7,
    name: "Shadow",
    href: "/settings/account",
    icon: SunIcon,
  },
  {
    id: 8,
    name: "Frames",
    href: "/settings/account",
    icon: DesktopComputerIcon,
  },
  {
    id: 9,
    name: "Border",
    icon: BookmarkAltIcon,
  },
];
function useWindowSize(ref: React.RefObject<HTMLDivElement>) {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: ref.current?.getBoundingClientRect().width ?? 0,
    height: ref.current?.getBoundingClientRect().height ?? 0,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      const dimensions = ref.current?.getBoundingClientRect();
      setWindowSize({
        width: dimensions?.width ?? 0,
        height: dimensions?.height ?? 0,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

const framePresets: { type: string; config: FrameConfig }[] = [
  {
    type: "Transparent",
    config: {
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
  },
  {
    type: "Dark",
    config: {
      show: true,
      dark: true,
      opacity: 1,
      buttons: {
        show: true,
        dark: true,
        solid: true,
      },
      searchBar: {
        show: true,
      },
    },
  },
  {
    type: "Light, dark buttons",
    config: {
      show: true,
      dark: false,
      opacity: 1,
      buttons: {
        show: true,
        dark: true,
        solid: true,
      },
      searchBar: {
        show: true,
      },
    },
  },
  {
    type: "Light, no search bar",
    config: {
      show: true,
      dark: false,
      opacity: 1,
      buttons: {
        show: true,
        dark: false,
        solid: true,
      },
      searchBar: {
        show: false,
      },
    },
  },
  {
    type: "Light, empty buttons",
    config: {
      show: true,
      dark: false,
      opacity: 1,
      buttons: {
        show: true,
        dark: false,
        solid: false,
      },
      searchBar: {
        show: true,
      },
    },
  },
];

const shadowPresets: ShadowConfig[] = [
  {
    type: "none",
    previewSize: "0px 0px 0px",
    size: "0px 0px 0px",
  },
  {
    type: "xs",
    previewSize: "0px 0.5px 1px",
    size: "0px 5px 10px",
  },
  {
    type: "sm",
    previewSize: "0px 1.25px 2.5px",
    size: "0px 12.5px 25px",
  },
  {
    type: "lg",
    previewSize: "0px 2.5px 5px",
    size: "0px 25px 50px",
  },
  {
    type: "xl",
    previewSize: "0px 5px 10px",
    size: "0px 50px 100px",
  },
  {
    type: "2xl",
    previewSize: "0px 10px 20px",
    size: "0px 100px 200px",
  },
];
const defaultConfig: Config = {
  id: "config1",
  name: "default",
  size: {
    scale: 0.8,
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
    gradient: {
      stops: ["#cd96b3", "#bda6f0"],
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
    radius: 2,
    width: 0,
    color: "rgba(0, 0, 0, 1)",
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
};

const dimensionPresets = [
  {
    name: "twitter",
    icon: () => (
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className="text-white h-5 w-5 bg-blue-500 rounded p-0.5 mr-2 "
      >
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
    dimensions: [
      { name: "open graph", width: 1200, height: 630 },
      { name: "cover photo", width: 1500, height: 500 },
      { name: "image", width: 2400, height: 1350 },
    ],
  },
  {
    name: "facebook",
    icon: () => (
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className="text-white h-5 w-5 bg-blue-600 rounded p-0.5 mr-2 "
      >
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
    dimensions: [
      { name: "news feed", width: 1200, height: 1200 },
      { name: "story", width: 1080, height: 1920 },
      { name: "cover", width: 830, height: 312 },
      { name: "event", width: 1336, height: 700 },
      { name: "open graph", width: 1200, height: 630 },
    ],
  },
  {
    name: "instagram",
    icon: () => (
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className="text-white h-5 w-5 bg-pink-500 rounded p-0.5 mr-2"
      >
        <path
          fillRule="evenodd"
          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    dimensions: [
      { name: "feed", width: 1200, height: 1200 },
      { name: "story", width: 1080, height: 1920 },
    ],
  },
  {
    name: "dribbble",
    icon: () => (
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className="text-white h-5 w-5 bg-pink-400 rounded p-0.5 mr-2"
      >
        <path
          fillRule="evenodd"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
          clipRule="evenodd"
        />
      </svg>
    ),
    dimensions: [{ name: "shot", width: 2800, height: 2100 }],
  },
  {
    name: "linkedin",
    icon: () => (
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className="text-white h-5 w-5 bg-blue-500 rounded p-1 mr-2"
      >
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg>
    ),
    dimensions: [
      { name: "feed", width: 1200, height: 1200 },
      { name: "cover", width: 792, height: 198 },
      { name: "story", width: 1080, height: 1920 },
    ],
  },
  {
    name: "product hunt",
    icon: () => (
      <svg
        fill="currentColor"
        className="text-white h-5 w-5 bg-orange-500 rounded mr-2"
        viewBox="0 0 140 140"
      >
        <path
          d="M112.011 70C112.011 93.2043 93.2155 112 70.0112 112C46.8069 112 28.008 93.2075 28.008 70C28.008 46.7925 46.8037 28 70.008 28C93.2123 28 112.008 46.7957 112.008 70"
          fill="white"
        ></path>
        <path
          d="M75.6099 70H63.7087V57.4333H75.6099C79.0747 57.4333 81.9125 60.2678 81.9125 63.7358C81.9125 67.2038 79.0779 70.0384 75.6099 70.0384V70ZM75.6099 49.0384H55.3074V91.0384H63.7087V78.4397H75.6099C83.7297 78.4397 90.3106 71.8588 90.3106 63.739C90.3106 55.6193 83.7297 49.0384 75.6099 49.0384Z"
          fill="#DA552F"
        ></path>
      </svg>
    ),
    dimensions: [
      { name: "thumbnail", width: 240, height: 240 },
      { name: "gallery", width: 1270, height: 760 },
    ],
  },
  {
    name: "github",
    icon: () => (
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className="text-white h-5 w-5 bg-black rounded p-1 mr-2"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    dimensions: [{ name: "readme header", width: 1618, height: 556 }],
  },
];
const Editor: NextPage = () => {
  const [imageStack, setImageStack] = useState([
    {
      id: uniqueId(),
      fileName: "sample.jpeg",
      src: "/sample.jpeg",
    },
  ] as ImageDoc[]);
  const [config, setConfig] = useState(defaultConfig);
  const [history, setHistory] = useState([] as Config[]);
  const [historyIdx, setHistoryIdx] = useState(0);
  const [layout, setLayout] = useState(1);
  const [active, setActive] = useState(generalNavigation[0]);
  const [showWatermark, setShowWatermark] = useState(true);
  const [removeBackground, setRemoveBackground] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const containerSize = useWindowSize(ref);

  const addImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageStack((current: ImageDoc[]) => [
        ...current,
        {
          id: uniqueId(),
          fileName: file.name,
          src: URL.createObjectURL(file),
        },
      ]);
    }
  };
  const replaceImage = (
    event: React.ChangeEvent<HTMLInputElement>,
    idx: number,
    id: string
  ) => {
    if (event.target.files && event.target.files[0]) {
      const fileName = event.target.files[0].name;
      const files = [...imageStack];
      files[idx] = {
        id,
        fileName,
        src: URL.createObjectURL(event.target.files[0]),
      };
      setImageStack(files);
    }
  };

  const removeImage = (id: string) => {
    const filteredArr = imageStack.filter((item) => item.id !== id);
    setImageStack(filteredArr);
  };
  // const downloadWebp = (elementRef) => {
  //   toBlob(elementRef, {
  //     canvasWidth: 2560,
  //     canvasHeight: 1440,
  //     pixelRatio: 1,
  //   })
  //     .then((dataUrl) => {
  //       sharp(dataUrl, {effort: 8}).webp();
  //       const link = document.createElement("a");
  //       link.download = "my-image-name.png";
  //       link.href = dataUrl;
  //       link.click();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  const downloadPng = (elementRef) => {
    toPng(elementRef, {
      canvasWidth: config.size.dimensions.width,
      canvasHeight: config.size.dimensions.height,
      pixelRatio: 1,
      style: {
        borderRadius: "0px"
      }
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const downloadJpg = (elementRef) => {
    toJpeg(elementRef, {
      canvasWidth: config.size.dimensions.width,
      canvasHeight: config.size.dimensions.height,
      style: {
        borderRadius: "0px"
      },
      pixelRatio: 1,
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.jpg";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getImage = useCallback(
    (format: string) => {
      if (ref.current === null) {
        return;
      }
      if (
        showWatermark &&
        (!document.contains(watermarkRef.current) ||
          !(
            watermarkRef.current?.className.normalize() ===
            "absolute bottom-5 right-5 bg-white p-2 rounded-2xl shadow-xl z-10".normalize()
          ))
      ) {
        toast("do not try to modify watermark", { type: "error" });
      } else {
        switch (format) {
          case "png":
            downloadPng(ref.current);
            break;
          case "jpg":
            downloadJpg(ref.current);
            break;
          case "copy":
            toBlob(ref.current, {
              canvasWidth: config.size.dimensions.width,
              canvasHeight: config.size.dimensions.height,
              pixelRatio: 1,
              style: {
                borderRadius: "0px"
              },
            })
              .then((dataUrl) => {
                navigator.clipboard.write([
                  new ClipboardItem({
                    "image/png": dataUrl,
                  }),
                ]);
                toast("copied to clipboard", { type: "success" });
              })
              .catch((err) => {
                console.log(err);
              });
            break;
          default:
            return;
        }
      }
    },
    [ref, showWatermark, config]
  );
  useEffect(() => {
    console.log(config);
    console.log(history);

    if (history[historyIdx] !== config) {
      if (history.length === 10) {
        setHistory([...history.splice(-1)]);
      }
      setHistory([config, ...history]);
      setHistoryIdx(0);
    }
  }, [config]);

  useEffect(() => {
    if (history.length > 0) {
      setConfig(history[historyIdx]);
    }
  }, [historyIdx]);

  const updateConfig = (newConfig: Partial<Config>) => {
    console.log(historyIdx);
    if (historyIdx > 0) {
      console.log("removing");
      const newHistory = history.filter((item, index) => index >= historyIdx);
      setHistory(newHistory);
    }

    setConfig({
      ...config,
      ...newConfig,
    });
  };
  function reduce(numerator, denominator) {
    var gcd = function gcd(a, b) {
      return b ? gcd(b, a % b) : a;
    };
    gcd = gcd(numerator, denominator);
    return [numerator / gcd, denominator / gcd];
  }

  return (
    <div className="h-screen w-screen bg-black flex flex-col overflow-hidden">
      <div className="p-5 flex justify-between absolute w-full bg-black">
        <h1 className="text-zinc-200">Editor</h1>
        <div className="flex space-x-2">
          <Popover
            gap={10}
            placement="bottom-end"
            render={() => (
              <div className="bg-zinc-900 bg-opacity-80 backdrop-blur p-4 rounded-lg space-y-3 w-[320px] ">
                <h1 className="text-zinc-100 font-medium text-lg">
                  Dimensions
                </h1>
                {dimensionPresets.map((item) => (
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg capitalize bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                          <div className="flex items-center">
                            <item.icon />
                            {item.name}
                          </div>
                          <ChevronUpIcon
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-blue-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-2  space-y-2 text-sm text-white">
                          {item.dimensions.map(({ height, width, name }) => (
                            <button
                              onClick={() =>
                                updateConfig({
                                  size: {
                                    ...config.size,
                                    dimensions: {
                                      aspectRatio: reduce(width, height).join(
                                        " / "
                                      ),
                                      width,
                                      height,
                                    },
                                  },
                                })
                              }
                              className="flex w-full justify-between items-center space-x-2 border border-zinc-800 hover:border-blue-500 text-zinc-200 bg-zinc-900 hover:bg-blue-900 bg-opacity-25 hover:bg-opacity-25 transition-all cursor-pointer bg py-2 px-4 rounded-lg"
                            >
                              <p className="text-base text-white font-medium capitalize">
                                {name}
                              </p>
                              <p>
                                {width} x {height}
                              </p>
                            </button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
                <div className="flex space-x-5 items-end">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-zinc-100"
                    >
                      Width
                    </label>
                    <div className="mt-1">
                      <input
                        value={config.size.dimensions.width}
                        onChange={(e) =>
                          updateConfig({
                            size: {
                              ...config.size,
                              dimensions: {
                                ...config.size.dimensions,
                                width: parseInt(e.target.value),
                                aspectRatio: reduce(e.target.value, config.size.dimensions.height).join(
                                  " / "
                                ),
                                
                              },
                            },
                          })
                        }
                        type="number"
                        name="email"
                        id="email"
                        className="form-input flex w-full justify-between items-center space-x-2 border border-zinc-800 hover:border-blue-500 text-zinc-200 bg-zinc-900 hover:bg-blue-900 bg-opacity-25 hover:bg-opacity-25 transition-all cursor-pointer bg py-2 px-4 rounded-lg"
                      />
                    </div>
                  </div>
                  <p className="font-medium text-zinc-300 text-lg pb-2">x</p>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-zinc-100"
                    >
                      Height
                    </label>
                    <div className="mt-1">
                      <input
                        value={config.size.dimensions.height}
                        type="number"
                        onChange={(e) =>
                          updateConfig({
                            size: {
                              ...config.size,
                              dimensions: {
                                ...config.size.dimensions,
                                height: parseInt(e.target.value),
                                aspectRatio: reduce(config.size.dimensions.width, e.target.value).join(
                                  " / "
                                ),
                              },
                            },
                          })
                        }
                        name="email"
                        id="email"
                        className="appearance-none form-input flex w-full justify-between items-center space-x-2 border border-zinc-800 hover:border-blue-500 text-zinc-200 bg-zinc-900 hover:bg-blue-900 bg-opacity-25 hover:bg-opacity-25 transition-all cursor-pointer bg py-2 px-4 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          >
            <button className="flex items-center justify-center space-x-2 border border-zinc-800 text-zinc-200 bg-zinc-900 hover:bg-zinc-800 bg-opacity-25 hover:bg-opacity-25 transition-all cursor-pointer bg py-2 px-4 rounded-lg">
              {config.size.dimensions.width} x {config.size.dimensions.height}{" "}
              px
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            </button>
          </Popover>
          <button
            onClick={() => {
              updateConfig({ ...defaultConfig });
            }}
            className="flex items-center justify-center space-x-2 border border-zinc-800 text-zinc-200 bg-zinc-900 hover:bg-zinc-800 bg-opacity-25 hover:bg-opacity-25 transition-all cursor-pointer bg py-2 px-4 rounded-lg"
          >
            <RefreshIcon className="h-4 w-4" />
            <span>Reset</span>
          </button>
          <Tooltip label="Undo">
            <button
              disabled={
                historyIdx + 1 === history.length || history.length === 0
              }
              onClick={() => setHistoryIdx(historyIdx + 1)}
              className=" disabled:cursor-not-allowed disabled:brightness-50 flex items-center justify-center space-x-2 border border-zinc-800 text-zinc-200 bg-zinc-900 hover:bg-zinc-800 bg-opacity-25 hover:bg-opacity-25 transition-all cursor-pointer bg p-2 rounded-lg"
            >
              <ReplyIcon className="h-5 w-5" />
            </button>
          </Tooltip>
          <Tooltip label="Redo">
            <button
              disabled={history.length === 0 || historyIdx === 0}
              onClick={() => setHistoryIdx(historyIdx - 1)}
              className="disabled:cursor-not-allowed disabled:brightness-50 flex items-center justify-center space-x-2 border border-zinc-800 text-zinc-200 bg-zinc-900 hover:bg-zinc-800 bg-opacity-25 hover:bg-opacity-25 transition-all cursor-pointer bg p-2 rounded-lg"
            >
              <ReplyIcon className="h-5 w-5 -scale-x-100" />
            </button>
          </Tooltip>
          <Popover
            gap={10}
            placement="bottom-start"
            render={() => (
              <div className="bg-zinc-900 bg-opacity-80 backdrop-blur p-4 rounded-lg space-y-3 max-w-3xl ">
                <h1 className="text-zinc-100 font-medium text-lg">Export</h1>
                <div className="relative flex items-start">
                  <div className="min-w-0 flex-1 text-sm">
                    <label
                      htmlFor="show-watermark"
                      className="font-medium text-zinc-300"
                    >
                      Show watermark
                    </label>
                  </div>

                  <input
                    checked={showWatermark}
                    onChange={() => setShowWatermark(!showWatermark)}
                    id="show-watermark"
                    aria-describedby="show-watermark"
                    name="show-watermark"
                    type="checkbox"
                    className="form-checkbox focus:ring-blue-600 focus:ring-offset-black h-4 w-4 text-blue-600 border-zinc-900 rounded bg-zinc-800"
                  />
                </div>
                <div className="relative flex items-start">
                  <div className="min-w-0 flex-1 text-sm">
                    <label
                      htmlFor="show-watermark"
                      className="font-medium text-zinc-300"
                    >
                      Remove background
                    </label>
                  </div>

                  <input
                    checked={removeBackground}
                    onChange={() => setRemoveBackground(!removeBackground)}
                    id="show-watermark"
                    aria-describedby="show-watermark"
                    name="show-watermark"
                    type="checkbox"
                    className="form-checkbox focus:ring-blue-600 focus:ring-offset-black h-4 w-4 text-blue-600 border-zinc-900 rounded bg-zinc-800"
                  />
                </div>

                <button
                  onClick={() => getImage("jpg")}
                  className="flex items-center justify-center space-x-2 border w-full border-zinc-800 text-zinc-200 bg-zinc-900 hover:bg-zinc-800 bg-opacity-25 hover:bg-opacity-25 transition-all cursor-pointer bg px-4 py-2 rounded-lg"
                >
                  <DownloadIcon className="h-5 w-5" />
                  <span className="font-medium">Download JPG</span>
                </button>
                <button
                  onClick={() => getImage("png")}
                  className="flex items-center justify-center space-x-2 border w-full border-zinc-800 text-zinc-200 bg-zinc-900 hover:bg-zinc-800 bg-opacity-25 hover:bg-opacity-25 transition-all cursor-pointer bg px-4 py-2 rounded-lg"
                >
                  <DownloadIcon className="h-5 w-5" />
                  <span className="font-medium">Download PNG</span>
                </button>
                <button
                  onClick={() => getImage("copy")}
                  className="flex items-center justify-center space-x-2 border w-full border-zinc-800 text-zinc-200 bg-zinc-900 hover:bg-zinc-800 bg-opacity-25 hover:bg-opacity-25 transition-all cursor-pointer bg px-4 py-2 rounded-lg"
                >
                  <DuplicateIcon className="h-5 w-5" />
                  <span className="font-medium">Copy to Clipboard</span>
                </button>
              </div>
            )}
          >
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 ">
              <span>Export</span>
              <DownloadIcon className="h-4 w-4 ml-1" />
            </button>
          </Popover>
        </div>
      </div>
      <div className="flex justify-between h-full pt-[82px] ">
        {/* Editor preview container */}
        <div
          className={clsx(
            "flex-1  dark:bg-black light:grid-effect-light bg-gray-50 dark:grid-effect-dark p-20   "
          )}
        >
          <motion.div
            style={
              removeBackground
                ? {
                    background: "transparent",
                    aspectRatio: `auto ${config.size.dimensions.aspectRatio}`,
                  }
                : {
                    background: `linear-gradient(${
                      config.background.gradient?.direction
                    }deg, ${config.background.gradient?.stops.join(",")})`,
                    aspectRatio: config.size.dimensions.aspectRatio,
                  }
            }
            ref={ref}
            className={clsx(
              "overflow-hidden relative flex items-center justify-center max-h-full max-w-full rounded-3xl"
            )}
          >
            {showWatermark && (
              <span
                ref={watermarkRef}
                className="absolute bottom-5 right-5 bg-white p-2 rounded-2xl shadow-xl z-10"
              >
                <h1 className="font-medium">SCREENSHOTIFY</h1>
              </span>
            )}

            <div
              className={clsx(
                " absolute aspect-video container template7  ",
                layout < 3 ? " flex items-center  " : "grid-cols-2 grid   "
              )}
            >
              {imageStack.map(
                (url, index) =>
                  layout >= index + 1 && (
                    <motion.div
                      animate={{
                        x: config.position.x * containerSize.width,
                        y: config.position.y * containerSize.height,
                        scale: config.size.scale,
                        rotateX: config.orientation.rotateX,
                        rotateY: config.orientation.rotateY,
                        rotateZ: config.orientation.rotateZ,
                        transformPerspective: config.orientation.perspective,
                      }}
                      transition={{ type: "spring" }}
                      key={index}
                      style={{
                        boxShadow: `${config.shadow.color} ${config.shadow.size}`,
                        borderRadius: `${config.border.radius}rem`,
                        borderColor: config.border.color,
                        borderWidth: `${config.border.width}px`,
                      }}
                      className="overflow-hidden aspect-video relative flex flex-col flex-1 "
                    >
                      {config.frame.show && <Toolbar options={config.frame} />}
                      <div
                        className={clsx(
                          config.frame.show && "mt-[44px]",
                          "relative flex-1 "
                        )}
                      >
                        <Image layout="fill" src={url.src} />
                      </div>
                    </motion.div>
                  )
              )}
            </div>
          </motion.div>
        </div>

        {/* Controls column start */}
        <div className="flex border-l border-blue-900 h-full ">
          {/* Editor navigation start */}
          <div className="flex flex-col h-full pl-2 overflow-y-auto">
            <div className="flex flex-col  bg-zinc-900 bg-opacity-50">
              {generalNavigation.map((item, index) => (
                <div className={clsx(active === item && "bg-black w-full")}>
                  <button
                    onClick={() => setActive(item)}
                    className={clsx(
                      active.id === item.id
                        ? "bg-zinc-900 bg-opacity-50 rounded-l-2xl"
                        : "bg-black",
                      "flex flex-col items-center space-y-1 w-full  p-2 ",
                      active.id > 1 &&
                        item.id === active.id - 1 &&
                        "rounded-br-2xl",
                      item.id === active.id + 1 && "rounded-tr-2xl"
                    )}
                  >
                    <div
                      className={clsx(
                        active === item ? "text-blue-600" : "text-zinc-600",
                        "flex flex-col items-center  p-3 rounded-lg border border-transparent text-center   "
                      )}
                    >
                      <item.icon
                        className={"h-7 w-7 flex-shrink-0 "}
                        aria-hidden="true"
                      />
                    </div>
                    <span
                      className={clsx(
                        active === item ? "text-white" : "text-zinc-400",
                        "text-xs font-medium"
                      )}
                    >
                      {item.name}
                    </span>
                  </button>
                </div>
              ))}
            </div>
            <div className=" bg-zinc-900 bg-opacity-50 flex-1">
              <div
                className={clsx(
                  active.id === generalNavigation.length && "rounded-tr-2xl",
                  "h-full bg-black"
                )}
              ></div>
            </div>
          </div>

          {/* Settings panel start */}
          <div className=" w-[320px] p-5 space-y-3 overflow-y-auto overflow-x-hidden bg-zinc-900 bg-opacity-50  ">
            <AnimatePresence exitBeforeEnter>
              <motion.div
                key={active.id}
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.15 }}
              >
                (
                <div className=" pt-4 pb-2  text-sm text-gray-500 space-y-10 ">
                  {/* Panel header */}
                  <h1 className="font-medium text-white pb-1 text-base flex items-center">
                    <active.icon className="h-6 w-6 text-zinc-600 mr-2" />
                    {active.name}
                  </h1>
                  {/* Panel content */}
                  {(() => {
                    switch (active.name.toLowerCase()) {
                      case "images":
                        return (
                          <>
                            <div className=" space-y-2">
                              <button className="w-full flex items-center justify-center space-x-3 border border-zinc-800 text-zinc-200 bg-zinc-900 hover:bg-zinc-800 bg-opacity-25 hover:bg-opacity-25 transition-all cursor-pointer bg py-2 rounded-lg">
                                <CameraIcon className="h-5 w-5" />
                                <span className="font-medium text-base">
                                  Screenshot
                                </span>
                              </button>
                              <div className="">
                                <label
                                  htmlFor="file-input"
                                  className="flex items-center justify-center space-x-3 border border-blue-600 text-blue-500 bg-blue-900 bg-opacity-25 hover:bg-opacity-30 transition-all cursor-pointer bg py-2 rounded-lg"
                                >
                                  <UploadIcon className="h-5 w-5" />
                                  <span className="font-medium text-base">
                                    Upload
                                  </span>
                                </label>
                                <input
                                  onChange={addImage}
                                  type="file"
                                  id={"file-input"}
                                  className=" hidden"
                                />
                              </div>
                            </div>
                            <List
                              removeImage={removeImage}
                              replaceImage={replaceImage}
                              list={imageStack}
                              setList={setImageStack}
                            />
                          </>
                        );
                      case "presets":
                        return (
                          <>
                            <button
                              onClick={() => {
                                updateConfig({
                                  position: {
                                    x: 0.2,
                                    y: 0.14,
                                  },
                                  size: { ...config.size, scale: 1.2 },
                                  orientation: {
                                    rotateX: 45,
                                    rotateY: 8.26,
                                    rotateZ: -19.38,
                                    perspective: 3000,
                                  },
                                  background: {
                                    type: "gradient",
                                    gradient: {
                                      stops: ["#cd96b3", "#bda6f0"],
                                      direction: 70,
                                    },
                                  },
                                });
                              }}
                              className="border rounded-xl border-zinc-900 overflow-hidden"
                            >
                              <img src="preset_1.png"></img>
                            </button>
                            <button
                              onClick={() => {
                                updateConfig({
                                  position: {
                                    x: 0.02,
                                    y: -0.05,
                                  },
                                  size: { ...config.size, scale: 0.9 },
                                  orientation: {
                                    rotateX: 45,
                                    rotateY: 11.48,
                                    rotateZ: -23.65,
                                    perspective: 3000,
                                  },
                                  background: {
                                    type: "gradient",
                                    gradient: {
                                      stops: ["#cd96b3", "#bda6f0"],
                                      direction: 70,
                                    },
                                  },
                                });
                              }}
                              className="border rounded-xl border-zinc-900 overflow-hidden"
                            >
                              <img src="preset_2.png"></img>
                            </button>
                          </>
                        );
                      case "position":
                        return (
                          <div className="space-y-6">
                            <div className="overflow-hidden border border-zinc-800 rounded-xl relative min-w-[230px] min-h-[200px]">
                              <button
                                onClick={() => {
                                  updateConfig({
                                    position: {
                                      x: 0.5,
                                      y: -0.5,
                                    },
                                  });
                                }}
                                className=" h-12 aspect-video border border-zinc-800 hover:border-blue-500 transition-all duration-300 rounded-lg absolute -right-1 -top-1 "
                              />
                              <button
                                onClick={() => {
                                  updateConfig({
                                    position: {
                                      x: -0.5,
                                      y: -0.5,
                                    },
                                  });
                                }}
                                className=" h-12 aspect-video border border-zinc-800 hover:border-blue-500 transition-all duration-300  rounded-lg absolute -left-1 -top-1 "
                              />
                              <button
                                onClick={() => {
                                  updateConfig({
                                    position: {
                                      x: 0.5,
                                      y: 0.5,
                                    },
                                  });
                                }}
                                className=" h-12 aspect-video border border-zinc-800 hover:border-blue-500 transition-all duration-300 rounded-lg absolute -right-1 -bottom-1 "
                              />
                              <button
                                onClick={() => {
                                  updateConfig({
                                    position: {
                                      x: -0.5,
                                      y: 0.5,
                                    },
                                  });
                                }}
                                className=" h-12 aspect-video border border-zinc-800 hover:border-blue-500 transition-all duration-300 rounded-lg absolute -left-1 -bottom-1 "
                              />
                              <button
                                onClick={() => {
                                  updateConfig({
                                    position: {
                                      x: 0,
                                      y: 0.5,
                                    },
                                  });
                                }}
                                className=" h-12 aspect-video border border-zinc-800 hover:border-blue-500 transition-all duration-300 rounded-lg absolute left-1/2 -bottom-1 -translate-x-1/2 "
                              />
                              <button
                                onClick={() => {
                                  updateConfig({
                                    position: {
                                      x: 0,
                                      y: 0,
                                    },
                                  });
                                }}
                                className=" h-12 aspect-video border border-zinc-800 hover:border-blue-500 transition-all duration-300 rounded-lg absolute left-1/2 bottom-1/2 -translate-x-1/2 translate-y-1/2 "
                              />
                              <button
                                onClick={() => {
                                  updateConfig({
                                    position: {
                                      x: 0,
                                      y: -0.5,
                                    },
                                  });
                                }}
                                className=" h-12 aspect-video border border-zinc-800 hover:border-blue-500 transition-all duration-300 rounded-lg absolute left-1/2 -top-1 -translate-x-1/2 "
                              />
                              <button
                                onClick={() => {
                                  updateConfig({
                                    position: {
                                      x: -0.5,
                                      y: -0,
                                    },
                                  });
                                }}
                                className=" h-12 aspect-video border border-zinc-800 hover:border-blue-500 transition-all duration-300 rounded-lg absolute -left-1 bottom-1/2  translate-y-1/2 "
                              />
                              <button
                                onClick={() => {
                                  updateConfig({
                                    position: {
                                      x: 0.5,
                                      y: 0,
                                    },
                                  });
                                }}
                                className=" h-12 aspect-video border border-zinc-800 hover:border-blue-500 transition-all duration-300 rounded-lg absolute -right-1 bottom-1/2  translate-y-1/2 "
                              />
                            </div>

                            <RangeSlider
                              value={config.position.x}
                              set={(val) =>
                                updateConfig({
                                  position: { ...config.position, x: val },
                                })
                              }
                            >
                              <div className="flex space-x-2 items-center">
                                <p className=" font-medium text-zinc-300">X</p>
                                <button
                                  className="hover:text-zinc-400 transition-colors"
                                  onClick={() => {
                                    updateConfig({
                                      position: { ...config.position, x: 0 },
                                    });
                                  }}
                                >
                                  <RefreshIcon className="h-4" />
                                </button>
                              </div>
                            </RangeSlider>
                            <RangeSlider
                              value={config.position.y}
                              set={(val) =>
                                updateConfig({
                                  position: { ...config.position, y: val },
                                })
                              }
                            >
                              <div className="flex space-x-2 items-center">
                                <p className=" font-medium text-zinc-300">Y</p>
                                <button
                                  className="hover:text-zinc-400 transition-colors"
                                  onClick={() => {
                                    updateConfig({
                                      position: { ...config.position, y: 0 },
                                    });
                                  }}
                                >
                                  <RefreshIcon className="h-4" />
                                </button>
                              </div>
                            </RangeSlider>

                            <RangeSlider
                              value={config.size.scale}
                              set={(val) =>
                                updateConfig({
                                  size: {
                                    ...config.size,
                                    scale: val,
                                  },
                                })
                              }
                              min={0.5}
                              max={1.5}
                            >
                              <div className="flex space-x-2 items-center">
                                <p className=" font-medium text-zinc-300">
                                  Scale
                                </p>
                                <button
                                  className="hover:text-zinc-400 transition-colors"
                                  onClick={() => {
                                    updateConfig({
                                      size: {
                                        ...config.size,
                                        scale: 0.8,
                                      },
                                    });
                                  }}
                                >
                                  <RefreshIcon className="h-4" />
                                </button>
                              </div>
                            </RangeSlider>
                            <button
                              onClick={() => {
                                updateConfig({
                                  position: {
                                    x: 0,
                                    y: 0,
                                  },
                                  size: {
                                    ...config.size,
                                    scale: 0.8,
                                  },
                                });
                              }}
                              className="flex items-center justify-center space-x-2 border border-zinc-800 text-zinc-200 bg-zinc-900 hover:bg-zinc-800 bg-opacity-25 hover:bg-opacity-25 transition-all cursor-pointer bg py-2 px-4 rounded-lg"
                            >
                              <RefreshIcon className="h-4 w-4" />
                              <span>Reset</span>
                            </button>
                          </div>
                        );
                      case "frames":
                        return (
                          <>
                            <div className="space-y-3">
                              <h2 className="font-medium text-zinc-200 text-base">
                                Toolbar
                              </h2>
                              <RangeSlider
                                min={0.3}
                                max={1}
                                value={config.frame.opacity}
                                set={(value) =>
                                  updateConfig({
                                    frame: {
                                      ...config.frame,
                                      opacity: value,
                                    },
                                  })
                                }
                              >
                                <div className="flex space-x-2 items-center">
                                  <p className=" font-medium text-zinc-300">
                                    Opacity
                                  </p>
                                  <button
                                    className="hover:text-zinc-400 transition-colors"
                                    onClick={() => {
                                      updateConfig({
                                        frame: {
                                          ...config.frame,
                                          opacity: 1,
                                        },
                                      });
                                    }}
                                  >
                                    <RefreshIcon className="h-4" />
                                  </button>
                                </div>
                              </RangeSlider>
                              <Toggle
                                enabled={config.frame.show}
                                setEnabled={(value) =>
                                  updateConfig({
                                    frame: {
                                      ...config.frame,
                                      show: value,
                                    },
                                  })
                                }
                              >
                                <p className="font-medium text-zinc-300 whitespace-nowrap">
                                  Show
                                </p>
                              </Toggle>
                              <Toggle
                                enabled={config.frame.dark}
                                setEnabled={(value) =>
                                  updateConfig({
                                    frame: {
                                      ...config.frame,
                                      dark: value,
                                    },
                                  })
                                }
                              >
                                <p className="font-medium text-zinc-300 whitespace-nowrap">
                                  Dark
                                </p>
                              </Toggle>
                            </div>

                            <div className="space-y-3">
                              <h2 className="font-medium text-zinc-200 text-base">
                                Buttons
                              </h2>
                              <Toggle
                                enabled={config.frame.buttons.solid}
                                setEnabled={(value) =>
                                  updateConfig({
                                    frame: {
                                      ...config.frame,
                                      buttons: {
                                        ...config.frame.buttons,
                                        solid: value,
                                      },
                                    },
                                  })
                                }
                              >
                                <p className="font-medium text-zinc-300 whitespace-nowrap">
                                  Solid
                                </p>
                              </Toggle>
                              <Toggle
                                enabled={config.frame.buttons.dark}
                                setEnabled={(value) =>
                                  updateConfig({
                                    frame: {
                                      ...config.frame,
                                      buttons: {
                                        ...config.frame.buttons,
                                        dark: value,
                                      },
                                    },
                                  })
                                }
                              >
                                <p className="font-medium text-zinc-300 whitespace-nowrap">
                                  Dark
                                </p>
                              </Toggle>
                            </div>
                            <div className="space-y-3">
                              <h2 className="font-medium text-zinc-200 text-base">
                                Search Bar
                              </h2>
                              <Toggle
                                enabled={config.frame.searchBar.show}
                                setEnabled={(value) =>
                                  updateConfig({
                                    frame: {
                                      ...config.frame,
                                      searchBar: {
                                        ...config.frame.searchBar,
                                        show: value,
                                      },
                                    },
                                  })
                                }
                              >
                                <p className="font-medium text-zinc-300 whitespace-nowrap">
                                  Show
                                </p>
                              </Toggle>
                            </div>
                            <div className="space-y-3">
                              <h2 className="font-medium text-zinc-200 text-base">
                                Presets
                              </h2>
                              <div className="space-y-3">
                                {framePresets.map((item) => (
                                  <button
                                    onClick={() =>
                                      updateConfig({
                                        frame: {
                                          ...item.config,
                                        },
                                      })
                                    }
                                    className={clsx(
                                      item.config === config.frame &&
                                        "border-blue-600",
                                      "p-5 rounded-lg bg-gradient-to-tr bg-zinc-900 border border-zinc-800 hover:border-blue-600 transition-all duration-300 w-full"
                                    )}
                                  >
                                    <div className=" rounded-t-md overflow-hidden relative h-5">
                                      <PreviewToolbar options={item.config} />
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* <div className="grid grid-cols-2 gap-3">
                            {framePresets.map((item) => (
                              <div style={{
                                background: `linear-gradient(70deg, ${gradientStop1}, ${gradientStop2})`,
                              }} className="p-6 rounded-lg overflow-hidden aspect-square">
                                <div className="rounded-lg overflow-hidden relative aspect-video h-[1080px] w-[1920pc]">
                                  <Toolbar options={item.config} />
                                  <img
                                    className="flex-1 mt-11"
                                    src={item.preview}
                                  ></img>
                                </div>
                              </div>
                            ))}
                          </div> */}
                          </>
                        );
                      case "shadow":
                        return (
                          <>
                            <div className=" space-y-2">
                              <label className="font-medium text-zinc-300">
                                Color
                              </label>
                              <div className="flex justify-between items-center">
                                <ColorPicker
                                  type="rgba"
                                  color={config.shadow.color}
                                  setColor={(val) => {
                                    updateConfig({
                                      shadow: {
                                        ...config.shadow,
                                        color: val,
                                      },
                                    });
                                  }}
                                />

                                <button
                                  onClick={() => {
                                    updateConfig({
                                      shadow: {
                                        ...config.shadow,
                                        color: "rgba(17, 12, 46, 0.2)",
                                      },
                                    });
                                  }}
                                  className="flex items-center justify-center space-x-2 border border-zinc-800 text-zinc-200 bg-zinc-900 hover:bg-zinc-800 bg-opacity-25 hover:bg-opacity-25 transition-all cursor-pointer bg p-2 rounded-lg"
                                >
                                  <RefreshIcon className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="font-medium text-zinc-300">
                                Size
                              </label>
                              <div className="grid grid-cols-2 gap-5">
                                {shadowPresets.map((item) => (
                                  <div className="space-y-2">
                                    <button
                                      onClick={() =>
                                        updateConfig({
                                          shadow: {
                                            ...config.shadow,
                                            ...item,
                                          },
                                        })
                                      }
                                      className={clsx(
                                        config.shadow.type === item.type
                                          ? "outline-blue-500"
                                          : "outline-zinc-800",
                                        "rounded-lg  bg-zinc-100 p-7 w-full outline  hover:outline-blue-500 transition-all duration-300"
                                      )}
                                    >
                                      <div
                                        style={{
                                          boxShadow: `${item.previewSize} ${config.shadow.color}`,
                                        }}
                                        className="bg-white p-5 rounded-lg aspect-square"
                                      ></div>
                                    </button>
                                    <p className="text-xs font-medium uppercase text-zinc-400">
                                      {item.type}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </>
                        );
                      case "3d":
                        return (
                          <>
                            <RangeSlider
                              value={config.orientation.perspective}
                              set={(val) =>
                                updateConfig({
                                  orientation: {
                                    ...config.orientation,
                                    perspective: val,
                                  },
                                })
                              }
                              min={400}
                              max={3000}
                            >
                              <div className="flex space-x-2 items-center">
                                <p className=" font-medium text-zinc-300 whitespace-nowrap">
                                  Perspective
                                </p>
                                <button
                                  className="hover:text-zinc-400 transition-colors"
                                  onClick={() => {
                                    updateConfig({
                                      orientation: {
                                        ...config.orientation,
                                        perspective: 3000,
                                      },
                                    });
                                  }}
                                >
                                  <RefreshIcon className="h-4" />
                                </button>
                              </div>
                            </RangeSlider>
                            <RangeSlider
                              value={config.orientation.rotateX}
                              set={(val) =>
                                updateConfig({
                                  orientation: {
                                    ...config.orientation,
                                    rotateX: val,
                                  },
                                })
                              }
                              min={-45}
                              max={45}
                            >
                              <div className="flex space-x-2 items-center">
                                <p className=" font-medium text-zinc-300 whitespace-nowrap">
                                  Rotate X
                                </p>
                                <button
                                  className="hover:text-zinc-400 transition-colors"
                                  onClick={() => {
                                    updateConfig({
                                      orientation: {
                                        ...config.orientation,
                                        rotateX: 0,
                                      },
                                    });
                                  }}
                                >
                                  <RefreshIcon className="h-4" />
                                </button>
                              </div>
                            </RangeSlider>
                            <RangeSlider
                              value={config.orientation.rotateY}
                              set={(val) =>
                                updateConfig({
                                  orientation: {
                                    ...config.orientation,
                                    rotateY: val,
                                  },
                                })
                              }
                              min={-45}
                              max={45}
                            >
                              <div className="flex space-x-2 items-center">
                                <p className=" font-medium text-zinc-300 whitespace-nowrap">
                                  Rotate Y
                                </p>
                                <button
                                  className="hover:text-zinc-400 transition-colors"
                                  onClick={() => {
                                    updateConfig({
                                      orientation: {
                                        ...config.orientation,
                                        rotateY: 0,
                                      },
                                    });
                                  }}
                                >
                                  <RefreshIcon className="h-4" />
                                </button>
                              </div>
                            </RangeSlider>
                            <RangeSlider
                              value={config.orientation.rotateZ}
                              set={(val) =>
                                updateConfig({
                                  orientation: {
                                    ...config.orientation,
                                    rotateZ: val,
                                  },
                                })
                              }
                              min={-45}
                              max={45}
                            >
                              <div className="flex space-x-2 items-center">
                                <p className=" font-medium whitespace-nowrap text-zinc-300">
                                  Rotate Z
                                </p>
                                <button
                                  className="hover:text-zinc-400 transition-colors"
                                  onClick={() => {
                                    updateConfig({
                                      orientation: {
                                        ...config.orientation,
                                        rotateZ: 0,
                                      },
                                    });
                                  }}
                                >
                                  <RefreshIcon className="h-4" />
                                </button>
                              </div>
                            </RangeSlider>
                            <RangeSlider
                              value={config.size.scale}
                              set={(val) =>
                                updateConfig({
                                  size: {
                                    ...config.size,
                                    scale: val,
                                  },
                                })
                              }
                              min={0.5}
                              max={1.5}
                            >
                              <div className="flex space-x-2 items-center">
                                <p className=" font-medium text-zinc-300">
                                  Scale
                                </p>
                                <button
                                  className="hover:text-zinc-400 transition-colors"
                                  onClick={() => {
                                    updateConfig({
                                      size: {
                                        ...config.size,
                                        scale: 0.8,
                                      },
                                    });
                                  }}
                                >
                                  <RefreshIcon className="h-4" />
                                </button>
                              </div>
                            </RangeSlider>
                            <div className="space-y-2">
                              <p className=" font-medium text-zinc-300">
                                Presets
                              </p>
                              <div className="grid grid-cols-2 gap-5">
                                <button
                                  onClick={() => {
                                    updateConfig({
                                      size: {
                                        ...config.size,
                                        scale: 0.9,
                                      },
                                      position: {
                                        x: 0,
                                        y: 0,
                                      },
                                      orientation: {
                                        rotateX: 45,
                                        rotateY: 0,
                                        rotateZ: 0,
                                        perspective: 3000,
                                      },
                                    });
                                  }}
                                  style={{ perspective: "800px" }}
                                  className="border  border-zinc-800 rounded-lg flex items-center justify-center p-4  hover:border-blue-500 transition-all duration-300"
                                >
                                  <div
                                    style={{ transform: "rotateX(50deg)" }}
                                    className="bg-zinc-600 rounded flex-1 aspect-video"
                                  ></div>
                                </button>
                                <button
                                  onClick={() => {
                                    updateConfig({
                                      size: {
                                        ...config.size,
                                        scale: 0.9,
                                      },
                                      position: {
                                        x: 0,
                                        y: 0,
                                      },
                                      orientation: {
                                        rotateX: 45,
                                        rotateY: 10,
                                        rotateZ: -35,
                                        perspective: 3000,
                                      },
                                    });
                                  }}
                                  style={{ perspective: "800px" }}
                                  className="border  border-zinc-800 rounded-lg flex items-center justify-center p-4  hover:border-blue-500 transition-all duration-300"
                                >
                                  <div
                                    style={{
                                      transform:
                                        "rotateZ(-25deg) rotateY(30deg) rotateX(40deg)",
                                    }}
                                    className="bg-zinc-600 rounded flex-1 aspect-video  "
                                  ></div>
                                </button>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                updateConfig({
                                  size: {
                                    ...config.size,
                                    scale: 0.8,
                                  },
                                  position: {
                                    x: 0,
                                    y: 0,
                                  },
                                  orientation: {
                                    rotateX: 0,
                                    rotateY: 0,
                                    rotateZ: 0,
                                    perspective: 1500,
                                  },
                                });
                              }}
                              className="flex items-center justify-center space-x-2 border border-zinc-800 text-zinc-200 bg-zinc-900 hover:bg-zinc-800 bg-opacity-25 hover:bg-opacity-25 transition-all cursor-pointer bg py-2 px-4 rounded-lg"
                            >
                              <RefreshIcon className="h-4 w-4" />
                              <span>Reset</span>
                            </button>
                          </>
                        );
                      case "background":
                        return (
                          <>
                            {config.background.gradient?.stops.map(
                              (color, index) => (
                                <ColorPicker
                                  type="hex"
                                  color={color}
                                  setColor={(val) => {
                                    if (config.background.gradient) {
                                      const old = [
                                        ...config.background.gradient.stops,
                                      ];
                                      old[index] = val;
                                      updateConfig({
                                        background: {
                                          ...config.background,
                                          gradient: {
                                            ...config.background.gradient,
                                            stops: old,
                                          },
                                        },
                                      });
                                    }
                                  }}
                                />
                              )
                            )}
                          </>
                        );
                      case "border":
                        return (
                          <>
                            <div className=" space-y-2">
                              <label className="font-medium  text-zinc-300">
                                Color
                              </label>
                              <div className="flex justify-between items-center">
                                <ColorPicker
                                  type="rgba"
                                  color={config.border.color}
                                  setColor={(val) =>
                                    updateConfig({
                                      border: {
                                        ...config.border,
                                        color: val,
                                      },
                                    })
                                  }
                                />

                                <button
                                  onClick={() => {
                                    updateConfig({
                                      border: {
                                        ...config.border,
                                        color: "rgba(0, 0, 0, 1)",
                                      },
                                    });
                                  }}
                                  className="flex items-center justify-center space-x-2 border border-zinc-800 text-zinc-200 bg-zinc-900 hover:bg-zinc-800 bg-opacity-25 hover:bg-opacity-25 transition-all cursor-pointer bg p-2 rounded-lg"
                                >
                                  <RefreshIcon className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                            <RangeSlider
                              value={config.border.radius}
                              set={(val) =>
                                updateConfig({
                                  border: {
                                    ...config.border,
                                    radius: val,
                                  },
                                })
                              }
                              min={0}
                              max={4}
                            >
                              <div className="flex space-x-2 items-center">
                                <p className=" font-medium text-zinc-300">
                                  Border Radius
                                </p>
                                <button
                                  className="hover:text-zinc-400 transition-colors"
                                  onClick={() => {
                                    updateConfig({
                                      border: {
                                        ...config.border,
                                        radius: 0.5,
                                      },
                                    });
                                  }}
                                >
                                  <RefreshIcon className="h-4" />
                                </button>
                              </div>
                            </RangeSlider>
                            <RangeSlider
                              value={config.border.width}
                              set={(val) =>
                                updateConfig({
                                  border: {
                                    ...config.border,
                                    width: val,
                                  },
                                })
                              }
                              min={0}
                              max={10}
                            >
                              <div className="flex space-x-2 items-center">
                                <p className=" font-medium text-zinc-300">
                                  Border Width
                                </p>
                                <button
                                  className="hover:text-zinc-400 transition-colors"
                                  onClick={() => {
                                    updateConfig({
                                      border: {
                                        ...config.border,
                                        width: 0,
                                      },
                                    });
                                  }}
                                >
                                  <RefreshIcon className="h-4" />
                                </button>
                              </div>
                            </RangeSlider>
                          </>
                        );
                      default:
                        return <></>;
                    }
                  })()}
                </div>
                )
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
