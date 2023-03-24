import type { NextPage } from "next";
import Image from "next/image";
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  HTMLAttributes,
} from "react";
import clsx from "clsx";
import { Toolbar } from "./components/Frames";
import { motion, AnimatePresence } from "framer-motion";
import { uniqueId } from "lodash";
import {
  copyImageToClipboard,
  downloadJpg,
  downloadPng,
  getBlob,
  getPngDataUrl,
} from "./utils/export";
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
  DuplicateIcon,
  ChevronDownIcon,
  AnnotationIcon,
} from "@heroicons/react/solid";
import { toast } from "react-toastify";
import {
  AdjustmentsIcon,
  ArrowLeftIcon,
  CameraIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  RefreshIcon,
  SaveIcon,
  TemplateIcon,
} from "@heroicons/react/outline";
import type { ImageDoc, Config } from "@customTypes/configs";
import {
  shadowPresets,
  templates,
  colorPresets,
  gradientPresets,
  framePresets,
  dimensionPresets,
} from "./presets";
import { Tooltip, Popover } from "@components/index";
import { Disclosure, Tab } from "@headlessui/react";
import {
  Background,
  Border,
  Frames,
  Header,
  Images,
  Position,
  Presets,
  Rotation,
  Shadow,
  ScreenshotModal,
  List,
  Watermarks,
} from "./components/index";
import { useWindowSize } from "@hooks/window";
import { Watermark } from "./components/Watermarks";
import Link from "next/link";
import { db } from "src/db";
import { Project } from "src/db/Project";
import logo_light from "@public/logo_light.png";
import logo_short from "@public/logo_short.png";
const generalNavigation = [
  // {
  //   id: 1,
  //   name: "Presets",
  //   href: "/",
  //   icon: CollectionIcon,
  // },
  {
    id: 1,
    name: "Layers",
    icon: CollectionIcon,
  },
  {
    id: 2,
    name: "Position",
    href: "/tokens",
    icon: LocationMarkerIcon,
  },
  {
    id: 3,
    name: "3D",
    href: "/settings/account",
    icon: CubeTransparentIcon,
  },
  // {
  //   id: 5,
  //   name: "Layout",
  //   href: "/tokens",
  //   icon: TemplateIcon,
  // },
  {
    id: 4,
    name: "Header",
    href: "/history",
    icon: AnnotationIcon,
  },
  {
    id: 5,
    name: "Background",
    href: "/history",
    icon: ColorSwatchIcon,
  },
  {
    id: 6,
    name: "Shadow",
    href: "/settings/account",
    icon: SunIcon,
  },
  {
    id: 7,
    name: "Frames",
    href: "/settings/account",
    icon: DesktopComputerIcon,
  },
  {
    id: 8,
    name: "Border",
    icon: BookmarkAltIcon,
  },
  // {
  //   id: 11,
  //   name: "Watermark",
  //   icon: (props: React.SVGProps<SVGElement>) => (
  //     <svg
  //       fill="currentColor"
  //       className={props.className}
  //       viewBox="0 0 700 700"
  //     >
  //       <defs>
  //         <symbol id="x" overflow="visible">
  //           <path d="m18.766-1.125c-0.96875 0.5-1.9805 0.875-3.0312 1.125-1.043 0.25781-2.1367 0.39062-3.2812 0.39062-3.3984 0-6.0898-0.94531-8.0781-2.8438-1.9922-1.9062-2.9844-4.4844-2.9844-7.7344 0-3.2578 0.99219-5.8359 2.9844-7.7344 1.9883-1.9062 4.6797-2.8594 8.0781-2.8594 1.1445 0 2.2383 0.13281 3.2812 0.39062 1.0508 0.25 2.0625 0.625 3.0312 1.125v4.2188c-0.98047-0.65625-1.9453-1.1406-2.8906-1.4531-0.94922-0.3125-1.9492-0.46875-3-0.46875-1.875 0-3.3516 0.60547-4.4219 1.8125-1.0742 1.1992-1.6094 2.8555-1.6094 4.9688 0 2.1055 0.53516 3.7617 1.6094 4.9688 1.0703 1.1992 2.5469 1.7969 4.4219 1.7969 1.0508 0 2.0508-0.14844 3-0.45312 0.94531-0.3125 1.9102-0.80078 2.8906-1.4688z" />
  //         </symbol>
  //         <symbol id="c" overflow="visible">
  //           <path d="m13.734-11.141c-0.4375-0.19531-0.87109-0.34375-1.2969-0.4375-0.41797-0.10156-0.83984-0.15625-1.2656-0.15625-1.2617 0-2.2305 0.40625-2.9062 1.2188-0.67969 0.80469-1.0156 1.9531-1.0156 3.4531v7.0625h-4.8906v-15.312h4.8906v2.5156c0.625-1 1.3438-1.7266 2.1562-2.1875 0.82031-0.46875 1.8008-0.70312 2.9375-0.70312 0.16406 0 0.34375 0.011719 0.53125 0.03125 0.19531 0.011719 0.47656 0.039062 0.84375 0.078125z" />
  //         </symbol>
  //         <symbol id="a" overflow="visible">
  //           <path d="m17.641-7.7031v1.4062h-11.453c0.125 1.1484 0.53906 2.0078 1.25 2.5781 0.70703 0.57422 1.7031 0.85938 2.9844 0.85938 1.0312 0 2.082-0.14844 3.1562-0.45312 1.082-0.3125 2.1914-0.77344 3.3281-1.3906v3.7656c-1.1562 0.4375-2.3125 0.76562-3.4688 0.98438-1.1562 0.22656-2.3125 0.34375-3.4688 0.34375-2.7734 0-4.9297-0.70312-6.4688-2.1094-1.5312-1.4062-2.2969-3.3789-2.2969-5.9219 0-2.5 0.75391-4.4609 2.2656-5.8906 1.5078-1.4375 3.582-2.1562 6.2188-2.1562 2.4062 0 4.332 0.73047 5.7812 2.1875 1.4453 1.4492 2.1719 3.3828 2.1719 5.7969zm-5.0312-1.625c0-0.92578-0.27344-1.6719-0.8125-2.2344-0.54297-0.57031-1.25-0.85938-2.125-0.85938-0.94922 0-1.7188 0.26562-2.3125 0.79688s-0.96484 1.2969-1.1094 2.2969z" />
  //         </symbol>
  //         <symbol id="e" overflow="visible">
  //           <path d="m9.2188-6.8906c-1.0234 0-1.793 0.17188-2.3125 0.51562-0.51172 0.34375-0.76562 0.85547-0.76562 1.5312 0 0.625 0.20703 1.1172 0.625 1.4688 0.41406 0.34375 0.98828 0.51562 1.7188 0.51562 0.92578 0 1.7031-0.32812 2.3281-0.98438 0.63281-0.66406 0.95312-1.4922 0.95312-2.4844v-0.5625zm7.4688-1.8438v8.7344h-4.9219v-2.2656c-0.65625 0.92969-1.3984 1.6055-2.2188 2.0312-0.82422 0.41406-1.8242 0.625-3 0.625-1.5859 0-2.8711-0.45703-3.8594-1.375-0.99219-0.92578-1.4844-2.1289-1.4844-3.6094 0-1.7891 0.61328-3.1016 1.8438-3.9375 1.2383-0.84375 3.1797-1.2656 5.8281-1.2656h2.8906v-0.39062c0-0.76953-0.30859-1.332-0.92188-1.6875-0.61719-0.36328-1.5703-0.54688-2.8594-0.54688-1.0547 0-2.0312 0.10547-2.9375 0.3125-0.89844 0.21094-1.7305 0.52344-2.5 0.9375v-3.7344c1.0391-0.25 2.0859-0.44141 3.1406-0.57812 1.0625-0.13281 2.125-0.20312 3.1875-0.20312 2.7578 0 4.75 0.54688 5.9688 1.6406 1.2266 1.0859 1.8438 2.8555 1.8438 5.3125z" />
  //         </symbol>
  //         <symbol id="b" overflow="visible">
  //           <path d="m7.7031-19.656v4.3438h5.0469v3.5h-5.0469v6.5c0 0.71094 0.14062 1.1875 0.42188 1.4375s0.83594 0.375 1.6719 0.375h2.5156v3.5h-4.1875c-1.9375 0-3.3125-0.39844-4.125-1.2031-0.80469-0.8125-1.2031-2.1797-1.2031-4.1094v-6.5h-2.4219v-3.5h2.4219v-4.3438z" />
  //         </symbol>
  //         <symbol id="k" overflow="visible">
  //           <path d="m12.766-13.078v-8.2031h4.9219v21.281h-4.9219v-2.2188c-0.66797 0.90625-1.4062 1.5703-2.2188 1.9844s-1.7578 0.625-2.8281 0.625c-1.8867 0-3.4336-0.75-4.6406-2.25-1.2109-1.5-1.8125-3.4258-1.8125-5.7812 0-2.3633 0.60156-4.2969 1.8125-5.7969 1.207-1.5 2.7539-2.25 4.6406-2.25 1.0625 0 2 0.21484 2.8125 0.64062 0.82031 0.42969 1.5664 1.0859 2.2344 1.9688zm-3.2188 9.9219c1.0391 0 1.8359-0.37891 2.3906-1.1406 0.55078-0.76953 0.82812-1.8828 0.82812-3.3438 0-1.457-0.27734-2.5664-0.82812-3.3281-0.55469-0.76953-1.3516-1.1562-2.3906-1.1562-1.043 0-1.8398 0.38672-2.3906 1.1562-0.55469 0.76172-0.82812 1.8711-0.82812 3.3281 0 1.4609 0.27344 2.5742 0.82812 3.3438 0.55078 0.76172 1.3477 1.1406 2.3906 1.1406z" />
  //         </symbol>
  //         <symbol id="j" overflow="visible">
  //           <path d="m10.5-3.1562c1.0508 0 1.8516-0.37891 2.4062-1.1406 0.55078-0.76953 0.82812-1.8828 0.82812-3.3438 0-1.457-0.27734-2.5664-0.82812-3.3281-0.55469-0.76953-1.3555-1.1562-2.4062-1.1562-1.0547 0-1.8594 0.38672-2.4219 1.1562-0.55469 0.77344-0.82812 1.8828-0.82812 3.3281 0 1.4492 0.27344 2.5586 0.82812 3.3281 0.5625 0.77344 1.3672 1.1562 2.4219 1.1562zm-3.25-9.9219c0.67578-0.88281 1.4219-1.5391 2.2344-1.9688 0.82031-0.42578 1.7656-0.64062 2.8281-0.64062 1.8945 0 3.4453 0.75 4.6562 2.25 1.207 1.5 1.8125 3.4336 1.8125 5.7969 0 2.3555-0.60547 4.2812-1.8125 5.7812-1.2109 1.5-2.7617 2.25-4.6562 2.25-1.0625 0-2.0078-0.21094-2.8281-0.625-0.8125-0.42578-1.5586-1.0859-2.2344-1.9844v2.2188h-4.8906v-21.281h4.8906z" />
  //         </symbol>
  //         <symbol id="i" overflow="visible">
  //           <path d="m0.34375-15.312h4.8906l4.125 10.391 3.5-10.391h4.8906l-6.4375 16.766c-0.64844 1.6953-1.4023 2.8828-2.2656 3.5625-0.86719 0.6875-2 1.0312-3.4062 1.0312h-2.8438v-3.2188h1.5312c0.83203 0 1.4375-0.13672 1.8125-0.40625 0.38281-0.26172 0.67969-0.73047 0.89062-1.4062l0.14062-0.42188z" />
  //         </symbol>
  //         <symbol id="h" overflow="visible">
  //           <path d="m2.5781-20.406h5.25v18.422c0 2.5391-0.69531 4.4414-2.0781 5.7031-1.375 1.2578-3.4609 1.8906-6.25 1.8906h-1.0781v-3.9844h0.82812c1.0938 0 1.9219-0.30859 2.4844-0.92188 0.5625-0.60547 0.84375-1.5 0.84375-2.6875z" />
  //         </symbol>
  //         <symbol id="g" overflow="visible">
  //           <path d="m2.1875-5.9688v-9.3438h4.9219v1.5312c0 0.83594-0.007813 1.875-0.015625 3.125-0.011719 1.25-0.015625 2.0859-0.015625 2.5 0 1.2422 0.03125 2.1328 0.09375 2.6719 0.070313 0.54297 0.17969 0.93359 0.32812 1.1719 0.20703 0.32422 0.47266 0.57422 0.79688 0.75 0.32031 0.16797 0.69141 0.25 1.1094 0.25 1.0195 0 1.8203-0.39062 2.4062-1.1719 0.58203-0.78125 0.875-1.8672 0.875-3.2656v-7.5625h4.8906v15.312h-4.8906v-2.2188c-0.74219 0.89844-1.5234 1.5586-2.3438 1.9844-0.82422 0.41406-1.7344 0.625-2.7344 0.625-1.7617 0-3.1055-0.53906-4.0312-1.625-0.92969-1.082-1.3906-2.6602-1.3906-4.7344z" />
  //         </symbol>
  //         <symbol id="w" overflow="visible">
  //           <path d="m14.312-14.828v3.7188c-1.043-0.4375-2.0547-0.76562-3.0312-0.98438-0.98047-0.21875-1.9023-0.32812-2.7656-0.32812-0.92969 0-1.6211 0.11719-2.0781 0.34375-0.44922 0.23047-0.67188 0.58984-0.67188 1.0781 0 0.38672 0.17188 0.68359 0.51562 0.89062 0.34375 0.21094 0.95703 0.36719 1.8438 0.46875l0.85938 0.125c2.5078 0.32422 4.1953 0.85156 5.0625 1.5781 0.86328 0.73047 1.2969 1.8711 1.2969 3.4219 0 1.6367-0.60547 2.8672-1.8125 3.6875-1.1992 0.8125-2.9922 1.2188-5.375 1.2188-1.0234 0-2.0742-0.078125-3.1562-0.23438-1.0742-0.15625-2.1797-0.39453-3.3125-0.71875v-3.7188c0.96875 0.48047 1.9609 0.83984 2.9844 1.0781 1.0312 0.23047 2.0781 0.34375 3.1406 0.34375 0.95703 0 1.6758-0.12891 2.1562-0.39062 0.47656-0.26953 0.71875-0.66406 0.71875-1.1875 0-0.4375-0.16797-0.75781-0.5-0.96875-0.33594-0.21875-0.99609-0.38281-1.9844-0.5l-0.85938-0.10938c-2.1797-0.26953-3.7031-0.77344-4.5781-1.5156-0.875-0.73828-1.3125-1.8594-1.3125-3.3594 0-1.625 0.55078-2.8281 1.6562-3.6094 1.1133-0.78906 2.8203-1.1875 5.125-1.1875 0.89453 0 1.8359 0.074219 2.8281 0.21875 1 0.13672 2.082 0.35156 3.25 0.64062z" />
  //         </symbol>
  //         <symbol id="v" overflow="visible">
  //           <path d="m2.3594-15.312h4.8906v15.312h-4.8906zm0-5.9688h4.8906v4h-4.8906z" />
  //         </symbol>
  //         <symbol id="f" overflow="visible">
  //           <path d="m17.75-9.3281v9.3281h-4.9219v-7.1406c0-1.3203-0.03125-2.2344-0.09375-2.7344s-0.16797-0.86719-0.3125-1.1094c-0.1875-0.3125-0.44922-0.55469-0.78125-0.73438-0.32422-0.17578-0.69531-0.26562-1.1094-0.26562-1.0234 0-1.8242 0.39844-2.4062 1.1875-0.58594 0.78125-0.875 1.8711-0.875 3.2656v7.5312h-4.8906v-15.312h4.8906v2.2344c0.73828-0.88281 1.5195-1.5391 2.3438-1.9688 0.83203-0.42578 1.75-0.64062 2.75-0.64062 1.7695 0 3.1133 0.54688 4.0312 1.6406 0.91406 1.0859 1.375 2.6562 1.375 4.7188z" />
  //         </symbol>
  //         <symbol id="u" overflow="visible">
  //           <path d="m10.75-12.516c0.82031 0 1.4453-0.17969 1.875-0.54688 0.4375-0.36328 0.65625-0.89844 0.65625-1.6094 0-0.69531-0.21875-1.2266-0.65625-1.5938-0.42969-0.375-1.0547-0.5625-1.875-0.5625h-2.9219v4.3125zm0.17188 8.9375c1.0625 0 1.8594-0.22266 2.3906-0.67188 0.53125-0.44531 0.79688-1.125 0.79688-2.0312 0-0.88281-0.26562-1.5469-0.79688-1.9844-0.52344-0.4375-1.3203-0.65625-2.3906-0.65625h-3.0938v5.3438zm4.8906-7.3438c1.1328 0.32422 2.0078 0.92969 2.625 1.8125 0.625 0.88672 0.9375 1.9688 0.9375 3.25 0 1.9688-0.66797 3.4375-2 4.4062-1.3359 0.96875-3.3555 1.4531-6.0625 1.4531h-8.7344v-20.406h7.8906c2.832 0 4.8828 0.42969 6.1562 1.2812 1.2812 0.85547 1.9219 2.2266 1.9219 4.1094 0 1-0.23438 1.8516-0.70312 2.5469-0.46875 0.6875-1.1484 1.2031-2.0312 1.5469z" />
  //         </symbol>
  //         <symbol id="t" overflow="visible">
  //           <path d="m2.3594-21.281h4.8906v21.281h-4.8906z" />
  //         </symbol>
  //         <symbol id="s" overflow="visible">
  //           <path d="m2.3594-21.281h4.8906v11.594l5.625-5.625h5.6875l-7.4688 7.0312 8.0625 8.2812h-5.9375l-5.9688-6.3906v6.3906h-4.8906z" />
  //         </symbol>
  //         <symbol id="r" overflow="visible">
  //           <path d="m12.422-21.281v3.2188h-2.7031c-0.6875 0-1.1719 0.125-1.4531 0.375-0.27344 0.25-0.40625 0.6875-0.40625 1.3125v1.0625h4.1875v3.5h-4.1875v11.812h-4.8906v-11.812h-2.4375v-3.5h2.4375v-1.0625c0-1.6641 0.46094-2.8984 1.3906-3.7031 0.92578-0.80078 2.3672-1.2031 4.3281-1.2031z" />
  //         </symbol>
  //         <symbol id="d" overflow="visible">
  //           <path d="m9.6406-12.188c-1.0859 0-1.9141 0.39062-2.4844 1.1719-0.57422 0.78125-0.85938 1.9062-0.85938 3.375s0.28516 2.5938 0.85938 3.375c0.57031 0.77344 1.3984 1.1562 2.4844 1.1562 1.0625 0 1.875-0.38281 2.4375-1.1562 0.57031-0.78125 0.85938-1.9062 0.85938-3.375s-0.28906-2.5938-0.85938-3.375c-0.5625-0.78125-1.375-1.1719-2.4375-1.1719zm0-3.5c2.6328 0 4.6914 0.71484 6.1719 2.1406 1.4766 1.418 2.2188 3.3867 2.2188 5.9062 0 2.5117-0.74219 4.4805-2.2188 5.9062-1.4805 1.418-3.5391 2.125-6.1719 2.125-2.6484 0-4.7148-0.70703-6.2031-2.125-1.4922-1.4258-2.2344-3.3945-2.2344-5.9062 0-2.5195 0.74219-4.4883 2.2344-5.9062 1.4883-1.4258 3.5547-2.1406 6.2031-2.1406z" />
  //         </symbol>
  //         <symbol id="q" overflow="visible">
  //           <path d="m16.547-12.766c0.61328-0.94531 1.3477-1.6719 2.2031-2.1719 0.85156-0.5 1.7891-0.75 2.8125-0.75 1.7578 0 3.0977 0.54688 4.0156 1.6406 0.92578 1.0859 1.3906 2.6562 1.3906 4.7188v9.3281h-4.9219v-7.9844-0.35938c0.007813-0.13281 0.015625-0.32031 0.015625-0.5625 0-1.082-0.16406-1.8633-0.48438-2.3438-0.3125-0.48828-0.82422-0.73438-1.5312-0.73438-0.92969 0-1.6484 0.38672-2.1562 1.1562-0.51172 0.76172-0.77344 1.8672-0.78125 3.3125v7.5156h-4.9219v-7.9844c0-1.6953-0.14844-2.7852-0.4375-3.2656-0.29297-0.48828-0.8125-0.73438-1.5625-0.73438-0.9375 0-1.6641 0.38672-2.1719 1.1562-0.51172 0.76172-0.76562 1.8594-0.76562 3.2969v7.5312h-4.9219v-15.312h4.9219v2.2344c0.60156-0.86328 1.2891-1.5156 2.0625-1.9531 0.78125-0.4375 1.6406-0.65625 2.5781-0.65625 1.0625 0 2 0.25781 2.8125 0.76562 0.8125 0.51172 1.4258 1.2305 1.8438 2.1562z" />
  //         </symbol>
  //         <symbol id="p" overflow="visible">
  //           <path d="m17.75-9.3281v9.3281h-4.9219v-7.1094c0-1.3438-0.03125-2.2656-0.09375-2.7656s-0.16797-0.86719-0.3125-1.1094c-0.1875-0.3125-0.44922-0.55469-0.78125-0.73438-0.32422-0.17578-0.69531-0.26562-1.1094-0.26562-1.0234 0-1.8242 0.39844-2.4062 1.1875-0.58594 0.78125-0.875 1.8711-0.875 3.2656v7.5312h-4.8906v-21.281h4.8906v8.2031c0.73828-0.88281 1.5195-1.5391 2.3438-1.9688 0.83203-0.42578 1.75-0.64062 2.75-0.64062 1.7695 0 3.1133 0.54688 4.0312 1.6406 0.91406 1.0859 1.375 2.6562 1.375 4.7188z" />
  //         </symbol>
  //         <symbol id="o" overflow="visible">
  //           <path d="m2.5781-20.406h5.875l7.4219 14v-14h4.9844v20.406h-5.875l-7.4219-14v14h-4.9844z" />
  //         </symbol>
  //         <symbol id="n" overflow="visible">
  //           <path d="m2.5781-20.406h8.7344c2.5938 0 4.582 0.57812 5.9688 1.7344 1.3945 1.1484 2.0938 2.7891 2.0938 4.9219 0 2.1367-0.69922 3.7812-2.0938 4.9375-1.3867 1.1562-3.375 1.7344-5.9688 1.7344h-3.4844v7.0781h-5.25zm5.25 3.8125v5.7031h2.9219c1.0195 0 1.8047-0.25 2.3594-0.75 0.5625-0.5 0.84375-1.2031 0.84375-2.1094 0-0.91406-0.28125-1.6172-0.84375-2.1094-0.55469-0.48828-1.3398-0.73438-2.3594-0.73438z" />
  //         </symbol>
  //         <symbol id="m" overflow="visible">
  //           <path d="m2.3594-15.312h4.8906v15.031c0 2.0508-0.49609 3.6172-1.4844 4.7031-0.98047 1.082-2.4062 1.625-4.2812 1.625h-2.4219v-3.2188h0.85938c0.92578 0 1.5625-0.21094 1.9062-0.625 0.35156-0.41797 0.53125-1.2461 0.53125-2.4844zm0-5.9688h4.8906v4h-4.8906z" />
  //         </symbol>
  //         <symbol id="l" overflow="visible">
  //           <path d="m14.719-14.828v3.9844c-0.65625-0.45703-1.3242-0.79688-2-1.0156-0.66797-0.21875-1.3594-0.32812-2.0781-0.32812-1.3672 0-2.4336 0.40234-3.2031 1.2031-0.76172 0.79297-1.1406 1.9062-1.1406 3.3438 0 1.4297 0.37891 2.543 1.1406 3.3438 0.76953 0.79297 1.8359 1.1875 3.2031 1.1875 0.75781 0 1.4844-0.10938 2.1719-0.32812 0.6875-0.22656 1.3203-0.56641 1.9062-1.0156v4c-0.76172 0.28125-1.5391 0.48828-2.3281 0.625-0.78125 0.14453-1.5742 0.21875-2.375 0.21875-2.7617 0-4.9219-0.70703-6.4844-2.125-1.5547-1.4141-2.3281-3.3828-2.3281-5.9062 0-2.5312 0.77344-4.5039 2.3281-5.9219 1.5625-1.4141 3.7227-2.125 6.4844-2.125 0.80078 0 1.5938 0.074219 2.375 0.21875 0.78125 0.13672 1.5547 0.35156 2.3281 0.64062z" />
  //         </symbol>
  //       </defs>
  //       <g>
  //         <path d="m136.47 500.53h427.22c10.148 0.03125 19.891-3.9805 27.078-11.145 7.1875-7.168 11.227-16.898 11.227-27.047v-364.67c0-10.129-4.0234-19.844-11.188-27.008-7.1602-7.1602-16.875-11.184-27.004-11.184h-427.34c-10.129 0-19.844 4.0234-27.008 11.184-7.1602 7.1641-11.184 16.879-11.184 27.008v364.67c0 10.129 4.0234 19.844 11.184 27.008 7.1641 7.1602 16.879 11.184 27.008 11.184zm240.07-186.93c0-3.8281 1.5234-7.4961 4.2344-10.199 2.7148-2.6992 6.3867-4.2109 10.215-4.1953h161.22c3.8281-0.015625 7.5039 1.4961 10.215 4.1953 2.7109 2.7031 4.2344 6.3711 4.2344 10.199v137.76c0.015626 3.8359-1.5039 7.5195-4.2148 10.234-2.7148 2.7109-6.3984 4.2305-10.234 4.2148h-161.22c-3.8359 0.015625-7.5195-1.5039-10.234-4.2148-2.7109-2.7148-4.2305-6.3984-4.2148-10.234z" />
  //       </g>
  //     </svg>
  //   ),
  // },
];
interface EditorProps {
  project: Project;
}
const Editor: NextPage<EditorProps> = ({ project }) => {
  const [imageStack, setImageStack] = useState([
    {
      id: uniqueId(),
      fileName: "sample.jpeg",
      src: "/sample.jpeg",
    },
  ] as ImageDoc[]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState(project.config);
  const [history, setHistory] = useState([] as Config[]);
  const [historyIdx, setHistoryIdx] = useState(0);
  const [layout, setLayout] = useState(1);
  const [active, setActive] = useState(generalNavigation[0]);
  const [showWatermark, setShowWatermark] = useState(true);
  const [removeBackground, setRemoveBackground] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const containerSize = useWindowSize(ref, config);

  const saveProject = async () => {
    try {
      const newPreview =
        ref.current &&
        (await getBlob(ref.current, {
          width: config.size.dimensions.width,
          height: config.size.dimensions.height,
        }));
      if (newPreview) {
        await db.projects.put({
          ...project,
          config: {
            ...config,
            preview: newPreview,
          },
        });
      }
    } catch (e: any) {
      console.error(e);
      toast(
        <div className="flex items-center space-x-3">
          <span>
            <p className="text-sm font-extralight">{e.message}</p>
          </span>
        </div>,
        {
          type: "error",
        }
      );
    } finally {
      toast("Saved project", { type: "success" });
    }
  };

  const getScreenshot = async (options: {
    url: string;
    width: string;
    height: string;
    token: string;
  }) => {
    setIsLoading(true);
    await fetch(
      `https://api.screenshotify.io/screenshot?url=${options.url}&width=${options.width}&height=${options.height}&token=${options.token}&json=true`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          cors: "no-cors",
        },
      }
    )
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(await res.text());
        }
      })
      .then((image) => {
        const newImage = {
          id: uniqueId(),
          fileName: image.meta.url,
          src: image.src,
        };
        setModalOpen(false);
        setImageStack([...imageStack, newImage]);
      })
      .catch((e) =>
        toast(
          <div className="flex items-center space-x-3">
            <span>
              <p className="text-sm font-extralight">{e.message}</p>
            </span>
          </div>,
          {
            type: "error",
          }
        )
      );
    setIsLoading(false);
  };

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
  const getImage = useCallback(
    (format: string) => {
      if (ref.current === null) {
        return;
      } else {
        switch (format) {
          case "png":
            downloadPng(ref.current, {
              width: config.size.dimensions.width,
              height: config.size.dimensions.height,
            });
            break;
          case "jpg":
            downloadJpg(ref.current, {
              width: config.size.dimensions.width,
              height: config.size.dimensions.height,
            });
            break;
          case "copy":
            copyImageToClipboard(ref.current, {
              width: config.size.dimensions.width,
              height: config.size.dimensions.height,
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
      const newHistory = history.filter((item, index) => index >= historyIdx);
      setHistory(newHistory);
    }
    setConfig({
      ...config,
      ...newConfig,
    });
  };
  const getAspectRatio = (numerator: number, denominator: number) => {
    const gcd = (a: number, b: number): number => {
      return b ? gcd(b, a % b) : a;
    };
    const result = gcd(numerator, denominator);
    return [numerator / result, denominator / result];
  };

  return (
    <div className="h-screen w-screen bg-white flex flex-col overflow-hidden">
      <ScreenshotModal
        open={modalOpen}
        setOpen={setModalOpen}
        isLoading={isLoading}
        handleSubmit={getScreenshot}
      />
      <div className="h-16 flex items-center justify-between absolute w-full bg-white px-2 sm:px-6 lg:px-6 shadow-sm">
        <div className="flex space-x-6 items-center">
          <Link href="/">
            <img className="h-8 w-auto " src="/logo_short.png" alt="logo" />
          </Link>
          <Link href="/">
            <a className="flex items-center justify-center space-x-2 border border-zinc-200 text-zinc-800  bg-white hover:bg-zinc-50 transition-all cursor-pointer p-3 rounded-lg">
              <ChevronLeftIcon className="h-5 w-5" />
            </a>
          </Link>
        </div>
        <div className="flex space-x-2">
          <Tooltip label="Reset">
            <button
              // onClick={() => {
              //   updateConfig({ ...defaultConfig });
              // }}
              className="flex items-center justify-center space-x-2 border border-zinc-200 text-zinc-800  bg-white hover:bg-zinc-50 transition-all cursor-pointer p-3 rounded-lg"
            >
              <RefreshIcon className="h-5 w-5" />
            </button>
          </Tooltip>
          <Popover
            gap={10}
            placement="bottom"
            render={() => (
              <div className="bg-zinc-900 bg-opacity-80 backdrop-blur p-4 rounded-lg space-y-3 w-[320px] ">
                <h1 className="text-zinc-100 text-lg">Dimension Presets</h1>

                <Tab.Group>
                  <Tab.List className="flex space-x-1">
                    {dimensionPresets.map((category) => (
                      <Tab
                        key={category.name}
                        className="w-full flex items-center justify-center"
                      >
                        {({ selected }) => (
                          <category.icon
                            className={clsx("h-6 w-6 bg-transparent")}
                          />
                        )}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels className="mt-2">
                    {dimensionPresets.map((item, idx) => (
                      <Tab.Panel key={idx}>
                        <h1 className="text-lg capitalize  text-zinc-800 pb-2">
                          {item.name}
                        </h1>
                        <ul className="space-y-2">
                          {item.dimensions.map(
                            ({ height, width, name }, index) => (
                              <button
                                key={index}
                                onClick={() =>
                                  updateConfig({
                                    size: {
                                      ...config.size,
                                      dimensions: {
                                        aspectRatio: getAspectRatio(
                                          width,
                                          height
                                        ).join(" / "),
                                        width,
                                        height,
                                      },
                                    },
                                  })
                                }
                                className="flex w-full justify-between items-center space-x-2 border border-zinc-800 hover:border-sky-500 text-zinc-200 bg-zinc-900 hover:bg-sky-900 bg-opacity-25 hover:bg-opacity-25 transition-all cursor-pointer bg py-2 px-4 rounded-lg"
                              >
                                <p className="text-base text-zinc-800 font-medium capitalize">
                                  {name}
                                </p>
                                <p>
                                  {width} x {height}
                                </p>
                              </button>
                            )
                          )}
                        </ul>
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>
              </div>
            )}
          >
            <button className="flex items-center justify-center space-x-2 border border-zinc-200 text-zinc-800  bg-white hover:bg-zinc-50 transition-all cursor-pointer p-3 rounded-lg">
              <AdjustmentsIcon className="h-5 w-5" />
            </button>
          </Popover>

          <div className="flex space-x-3 items-center">
            <input
              value={config.size.dimensions.width}
              onChange={(e) =>
                updateConfig({
                  size: {
                    ...config.size,
                    dimensions: {
                      ...config.size.dimensions,
                      width: parseInt(e.target.value),
                      aspectRatio: getAspectRatio(
                        parseInt(e.target.value),
                        config.size.dimensions.height
                      ).join(" / "),
                    },
                  },
                })
              }
              type="number"
              name="width"
              id="width"
              className=" flex text-center w-20 justify-between items-center space-x-2 border border-zinc-200  text-zinc-800 bg-white  hover:bg-zinc-50 transition-all cursor-pointer bg p-3 rounded-lg font-medium  "
            />

            <p className="font-medium text-zinc-800 text-lg">x</p>

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
                      aspectRatio: getAspectRatio(
                        config.size.dimensions.width,
                        parseInt(e.target.value)
                      ).join(" / "),
                    },
                  },
                })
              }
              name="height"
              id="height"
              className="flex text-center w-20 justify-between items-center space-x-2 border border-zinc-200  text-zinc-800 bg-white  hover:bg-zinc-50 transition-all cursor-pointer bg p-3 rounded-lg font-medium "
            />
          </div>
          <Tooltip label="Undo">
            <button
              disabled={
                historyIdx + 1 === history.length || history.length === 0
              }
              onClick={() => setHistoryIdx(historyIdx + 1)}
              className=" disabled:cursor-not-allowed disabled:text-zinc-400 disabled:bg-zinc-50 flex items-center justify-center space-x-2 border border-zinc-200 text-zinc-800  bg-white hover:bg-zinc-50 transition-all cursor-pointer p-3 rounded-lg"
            >
              <ReplyIcon className="h-5 w-5" />
            </button>
          </Tooltip>
          <Tooltip label="Redo">
            <button
              disabled={history.length === 0 || historyIdx === 0}
              onClick={() => setHistoryIdx(historyIdx - 1)}
              className="disabled:cursor-not-allowed disabled:text-zinc-400 disabled:bg-zinc-50 flex items-center justify-center space-x-2 border border-zinc-200 text-zinc-800  bg-white hover:bg-zinc-50 transition-all cursor-pointer p-3 rounded-lg"
            >
              <ReplyIcon className="h-5 w-5 -scale-x-100" />
            </button>
          </Tooltip>
        </div>

        <div className="flex space-x-2">
          <Tooltip label="Save">
            <button
              onClick={() => {
                saveProject();
              }}
              className="flex items-center justify-center space-x-2 border border-zinc-200 text-zinc-800  bg-white hover:bg-zinc-50 transition-all cursor-pointer p-3 rounded-lg"
            >
              <SaveIcon className="h-5 w-5" />
            </button>
          </Tooltip>
          <Popover
            gap={10}
            placement="bottom-end"
            render={() => (
              <div className="bg-zinc-900 p-4 rounded-lg space-y-3 max-w-3xl ">
                <h1 className="text-zinc-100 font-medium text-lg">Export</h1>
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
                    className="form-checkbox focus:ring-sky-600 focus:ring-offset-black h-4 w-4 text-sky-600 border-zinc-900 rounded bg-zinc-800"
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
            <button className="flex items-center justify-center space-x-2 border border-zinc-200 text-zinc-800  bg-white hover:bg-zinc-50 transition-all cursor-pointer p-3 rounded-lg font-medium">
              Export <DownloadIcon className="h-5 w-5 ml-1" />
            </button>
          </Popover>
        </div>
      </div>
      <div className="flex sm:justify-between h-screen pt-[64px] md:flex-row flex-col ">
        {/* Editor preview container */}

        {/* Editor preview container */}
        <div
          className={clsx(
            "h-1/2 sm:h-full flex-1 grid-effect-light bg-white grid-effect-light xl:p-20 p-3   "
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
                    background:
                      config.background.type === "gradient"
                        ? `linear-gradient(${
                            config.background.gradient?.direction
                          }deg, ${config.background.gradient?.stops
                            .map((item) => item.color)
                            .join(",")})`
                        : config.background.color,
                    aspectRatio: config.size.dimensions.aspectRatio,
                  }
            }
            ref={ref}
            className={clsx(
              "overflow-hidden relative flex items-center justify-center max-h-full max-w-full sm:rounded-3xl"
            )}
          >
            {config.watermark.show && (
              <Watermark
                height={imageRef.current?.clientWidth ?? 1000}
                ref={watermarkRef}
                placement={config.watermark.placement}
                theme={config.watermark.theme}
              />
            )}

            <motion.div
              className={clsx(" w-full h-full ")}
              style={{ scale: config.size.scale / 100 }}
            >
              {imageStack.map((url, index) => (
                <motion.div
                  transition={{ type: "spring" }}
                  key={index}
                  animate={{
                    x: (config.position.x / 100) * containerSize.width,
                    y: (config.position.y / 100) * containerSize.height,
                  }}
                  className={clsx(
                    config.header.align === "vertical"
                      ? "flex-col"
                      : "items-center",
                    "relative flex flex-1"
                  )}
                >
                  {/* header */}
                  {config.header.show && (
                    <motion.div
                      animate={{
                        x:
                          (config.header.content.translateX / 100) *
                          containerSize.width,
                      }}
                      style={{
                        color: config.header.content.color,
                        maxWidth:
                          config.header.align === "horizontal"
                            ? ref.current?.clientWidth
                              ? `${ref.current?.clientWidth * 0.35}px`
                              : "30%"
                            : "100%",
                      }}
                      className={clsx(
                        config.header.content.italic && "italic",
                        config.header.align === "horizontal"
                          ? " text-left"
                          : "text-center",
                        " space-y-2"
                      )}
                    >
                      <h1
                        style={{
                          fontSize: ref.current?.clientWidth
                            ? `${
                                ref.current?.clientWidth *
                                0.04 *
                                (config.header.content.size / 100)
                              }px`
                            : "2rem",
                        }}
                        className={clsx(
                          config.header.content.bold && "font-bold",
                          ""
                        )}
                      >
                        {config.header.content.title}
                      </h1>
                      <p
                        style={{
                          fontSize: ref.current?.clientWidth
                            ? `${
                                ref.current?.clientWidth *
                                0.02 *
                                (config.header.content.size / 100)
                              }px`
                            : "1rem",
                        }}
                      >
                        {config.header.content.subtitle}
                      </p>
                    </motion.div>
                  )}
                  {/* image container */}
                  <motion.div
                    animate={{
                      rotateX: config.orientation.rotateX,
                      rotateY: config.orientation.rotateY,
                      rotateZ: config.orientation.rotateZ,
                    }}
                    transition={{ type: "spring" }}
                    key={index}
                    className="aspect-video relative flex flex-col flex-1 overflow-hidden "
                    style={{
                      transformPerspective: config.orientation.perspective,
                      boxShadow: `${config.shadow.color} ${config.shadow.size}`,
                      borderRadius: `${
                        0.037 *
                        (imageRef?.current?.clientHeight ?? 1000) *
                        config.border.radius
                      }px`,
                      borderColor: config.border.color,
                      borderWidth: `${config.border.width}px`,
                      marginTop:
                        !config.header.show ||
                        config.header.align === "horizontal"
                          ? 0
                          : `${config.header.content.padding}rem`,
                      marginLeft:
                        !config.header.show ||
                        config.header.align === "vertical"
                          ? 0
                          : `${config.header.content.padding}rem`,
                    }}
                  >
                    {config.frame.show && (
                      <Toolbar
                        width={imageRef.current?.clientWidth ?? 1000}
                        height={imageRef.current?.clientHeight ?? 1000}
                        options={config.frame}
                      />
                    )}
                    <div
                      ref={imageRef}
                      className={clsx(
                        config.frame.show && "",
                        "relative flex-1 "
                      )}
                    >
                      <Image
                        alt="editor image"
                        priority
                        layout="fill"
                        src={url.src}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Controls column start */}
        <div className="flex sm:flex-row flex-col sm:h-full h-1/2 border-l ">
          {/* Editor navigation start */}
          <div className="sm:flex sm:flex-col sm:h-full sm:overflow-y-auto overflow-x-auto ">
            <div className="flex sm:flex-col  bg-white">
              {generalNavigation.map((item, index) => (
                <div
                  key={index}
                  className={clsx(active === item && "bg-zinc-100 w-full")}
                >
                  <button
                    onClick={() => setActive(item)}
                    className={clsx(
                      "rounded-none",
                      active.id === item.id
                        ? "bg-white sm:rounded-l-2xl"
                        : "bg-zinc-100",
                      "flex flex-col items-center space-y-1 w-full  sm:p-2 p-1",
                      active.id > 1 &&
                        item.id === active.id - 1 &&
                        "sm:rounded-br-2xl",
                      item.id === active.id + 1 && "sm:rounded-tr-2xl"
                    )}
                  >
                    <div
                      className={clsx(
                        "flex flex-col items-center  p-3 rounded-lg border border-transparent text-center  text-zinc-400 ",
                        active.id == item.id && "text-zinc-500"
                      )}
                    >
                      <item.icon
                        className={"h-7 w-7 flex-shrink-0 "}
                        aria-hidden="true"
                      />
                    </div>
                    <span
                      className={clsx(
                        "text-xs font-medium sm:block hidden text-zinc-500",
                        item.id === active.id && "text-zinc-600"
                      )}
                    >
                      {item.name}
                    </span>
                  </button>
                </div>
              ))}
            </div>
            <div className=" bg-white flex-1 hidden sm:block">
              <div
                className={clsx(
                  active.name === "Border" && "rounded-tr-2xl",
                  "h-full bg-zinc-100"
                )}
              ></div>
            </div>
          </div>

          {/* Settings panel start */}
          <div className=" sm:w-[320px] w-full p-5 space-y-3 overflow-y-auto overflow-x-hidden bg-white flex-1  ">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={active.id}
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.15 }}
              >
                <div className=" sm:pt-4 pb-2  text-sm text-gray-500 sm:space-y-10 space-y-6 ">
                  {/* Panel header */}
                  <h1 className="font-medium text-zinc-800 pb-1 text-base flex items-center">
                    <active.icon className="h-6 w-6 text-zinc-500 mr-2" />
                    {active.name}
                  </h1>
                  {/* Panel content */}
                  {(() => {
                    switch (active.name.toLowerCase()) {
                      case "layers":
                        return (
                          <>
                            {/* <Images
                              modalOpen={modalOpen}
                              setModalOpen={setModalOpen}
                              addImage={addImage}
                            /> */}
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
                          // <Presets
                          //   idToken={idToken}
                          //   updateConfig={updateConfig}
                          //   presets={templates}
                          // />
                          <></>
                        );
                      case "position":
                        return (
                          <Position
                            updateConfig={updateConfig}
                            config={config}
                          />
                        );
                      case "frames":
                        return (
                          <Frames
                            updateConfig={updateConfig}
                            config={config}
                            presets={framePresets}
                          />
                        );
                      case "header":
                        return (
                          <Header config={config} updateConfig={updateConfig} />
                        );
                      case "shadow":
                        return (
                          <Shadow
                            config={config}
                            updateConfig={updateConfig}
                            presets={shadowPresets}
                          />
                        );
                      case "3d":
                        return (
                          <Rotation
                            config={config}
                            updateConfig={updateConfig}
                          />
                        );
                      case "background":
                        return (
                          <Background
                            config={config}
                            updateConfig={updateConfig}
                            gradientPresets={gradientPresets}
                            colorPresets={colorPresets}
                          />
                        );
                      case "border":
                        return (
                          <Border config={config} updateConfig={updateConfig} />
                        );
                      case "watermark":
                        return (
                          <Watermarks
                            config={config}
                            updateConfig={updateConfig}
                          />
                        );
                      default:
                        return <></>;
                    }
                  })()}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
