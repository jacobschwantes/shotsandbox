import { Config, ShadowConfig, FrameConfig } from "@customTypes/configs";
import clsx from "clsx";

export const dimensionPresets = [
  {
    name: "twitter",
    icon: ({ className }: Partial<React.SVGProps<SVGElement>>) => (
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className={clsx(
          " h-6 w-6 bg-sky-500 rounded p-0.5",
          className
        )}
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
    icon: ({ className }: Partial<React.SVGProps<SVGElement>>) => (
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className={clsx(
          " h-6 w-6 bg-sky-600 rounded p-0.5 ",
          className
        )}
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
    icon: ({ className }: Partial<React.SVGProps<SVGElement>>) => (
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className={clsx(
          "h-6 w-6 bg-pink-500 rounded p-0.5",
          className
        )}
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
    icon: ({ className }: Partial<React.SVGProps<SVGElement>>) => (
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className={clsx(
          " h-6 w-6 bg-pink-400 rounded p-0.5",
          className
        )}
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
    icon: ({ className }: Partial<React.SVGProps<SVGElement>>) => (
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className={clsx(
          " h-6 w-6 bg-sky-500 rounded p-1",
          className
        )}
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
    icon: ({ className }: Partial<React.SVGProps<SVGElement>>) => (
      <svg
        fill=""
        className={clsx("h-6 w-6  rounded", className)}
        viewBox="0 0 140 140"
      >
        <path
          d="M112.011 70C112.011 93.2043 93.2155 112 70.0112 112C46.8069 112 28.008 93.2075 28.008 70C28.008 46.7925 46.8037 28 70.008 28C93.2123 28 112.008 46.7957 112.008 70"
          fill="currentColor"
        ></path>
        <path
          d="M75.6099 70H63.7087V57.4333H75.6099C79.0747 57.4333 81.9125 60.2678 81.9125 63.7358C81.9125 67.2038 79.0779 70.0384 75.6099 70.0384V70ZM75.6099 49.0384H55.3074V91.0384H63.7087V78.4397H75.6099C83.7297 78.4397 90.3106 71.8588 90.3106 63.739C90.3106 55.6193 83.7297 49.0384 75.6099 49.0384Z"
          fill="white"
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
    icon: ({ className }: Partial<React.SVGProps<SVGElement>>) => (
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className={clsx("h-6 w-6 bg-black rounded p-1", className)}
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    dimensions: [{ name: "readme header", width: 1618, height: 556 }],
  },
];
export const framePresets: { type: string; config: FrameConfig }[] = [
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

export const gradientPresets = [
  {
    stops: [
      { color: "#00ff87", id: 1 },
      { color: "#60efff", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#0061ff", id: 1 },
      { color: "#60efff", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#ff1b6b", id: 1 },
      { color: "#45caff", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#40c9ff", id: 1 },
      { color: "#e81cff", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#ff930f", id: 1 },
      { color: "#fff95b", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#ff0f7b", id: 1 },
      { color: "#f89b29", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#bf0fff", id: 1 },
      { color: "#cbff49", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#696eff", id: 1 },
      { color: "#f8acff", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#ff5858", id: 1 },
      { color: "#ffc8c8", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#595cff", id: 1 },
      { color: "#c6f8ff", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#f9c58d", id: 1 },
      { color: "#f492f0", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#84ffc9", id: 1 },
      { color: "#aab2ff", id: 2 },
      { color: "#eca0ff", id: 3 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#f492f0", id: 1 },
      { color: "#a18dce", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#f6d5f7", id: 1 },
      { color: "#fbe9d7", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#e9b7ce", id: 1 },
      { color: "#d3f3f1", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#1dbde6", id: 1 },
      { color: "#f1515e", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#57ebde", id: 1 },
      { color: "#aefb2a", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#f4f269", id: 1 },
      { color: "#5cb270", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#b597f6", id: 1 },
      { color: "#96c6ea", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#f6cfbe", id: 1 },
      { color: "#b9dcf2", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#d397fa", id: 1 },
      { color: "#8364e8", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#ffcb6b", id: 1 },
      { color: "#3d8bff", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#95f9c3", id: 1 },
      { color: "#0b3866", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#83f5e5", id: 1 },
      { color: "#e761bd", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#e8bdf9", id: 1 },
      { color: "#d8ded6", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#6d90b9", id: 1 },
      { color: "#bbc7dc", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#bc1b68", id: 1 },
      { color: "#d3989b", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#f28367", id: 1 },
      { color: "#ff5282", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#e91fa8", id: 1 },
      { color: "#b9dfee", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#cad0ff", id: 1 },
      { color: "#e3e3e3", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#dd83ad", id: 1 },
      { color: "#c3e1fc", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#c7b3cc", id: 1 },
      { color: "#268ab2", id: 2 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#c9def4", id: 1 },
      { color: "#f5ccd4", id: 2 },
      { color: "#b8a4c9", id: 3 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#caefd7", id: 1 },
      { color: "#f5bfd7", id: 2 },
      { color: "#abc9e9", id: 3 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#58efec", id: 1 },
      { color: "#e85c90", id: 2 },
      { color: "#fcc9ba", id: 3 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#f9e7bb", id: 1 },
      { color: "#e97cbb", id: 2 },
      { color: "#3d47d9", id: 3 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#45a0ea", id: 1 },
      { color: "#eca9bb", id: 2 },
      { color: "#f9658e", id: 3 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#f4e784", id: 1 },
      { color: "#f24389", id: 2 },
      { color: "#a478f1", id: 3 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#5de0f0", id: 1 },
      { color: "#f7a6f5", id: 2 },
      { color: "#e64f6f", id: 3 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#a4e9f9", id: 1 },
      { color: "#c5aef2", id: 2 },
      { color: "#8578ea", id: 3 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#fff1bf", id: 1 },
      { color: "#ec458d", id: 2 },
      { color: "#474ed7", id: 3 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#d3eef4", id: 1 },
      { color: "#f1eec8", id: 2 },
      { color: "#f3a46c", id: 3 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#0e0725", id: 1 },
      { color: "#5c03bc", id: 2 },
      { color: "#e536ab", id: 3 },
      { color: "#f4e5f0", id: 4 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#000000", id: 1 },
      { color: "#1c1a1a", id: 2 },
      { color: "#1c1a1a", id: 3 },
      { color: "#000000", id: 4 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#ffffff", id: 1 },
      { color: "#bda6f0", id: 2 },
      { color: "#cd96b3", id: 3 },
      { color: "#ffffff", id: 4 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#ffffff", id: 1 },
      { color: "#a5d8f0", id: 2 },
      { color: "#959dcc", id: 3 },
      { color: "#ffffff", id: 4 },
    ],
    direction: 90,
  },
  {
    stops: [
      { color: "#ede5de", id: 1 },
      { color: "#e5f2f5", id: 2 },
    ],
    direction: 160,
  },
  {
    stops: [
      { color: "#ffffff", id: 1 },
      { color: "#eda5f0", id: 2 },
      { color: "#959dcc", id: 3 },
      { color: "#ffffff", id: 4 },
    ],
    direction: 190,
  },
];
export const colorPresets = [
  "#FFFFFF",
  "#000000",
  "#FF0000",
  "#FF9D00",
  "#32FF00",
  "#00FFD0",
  "#00E7FF",
  "#00ABFF",
  "#002CFF",
  "#5F00FF",
  "#AD00FF",
  "#FF00F3",
  "#FF005E",
  "#d5d5d5",
  "#4582a5",
  "#32353a",
  "#0c0f14",
  "#8f86f6",
  "#f6a486",
  "#86caf6",
  "#a3e6c6",
];

export const shadowPresets: Partial<ShadowConfig>[] = [
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
