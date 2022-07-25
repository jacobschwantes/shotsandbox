import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import clsx from "clsx";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { FastAverageColor } from "fast-average-color";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

// Import the useAuthStateHook
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut, getAuth } from "firebase/auth";
import { firebaseApp } from "@modules/auth/firebase/clientApp";
import Toolbar from "./components/Toolbar";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import ColorPicker from "./components/ColorPicker";
const presets = [
  {
    gradientStop1: "#a8b043",
    gradientStop2: "#6501f8",
    perspective: "125",
    layout: 4,
    name: "preset80",
    rotateX: "16",
    rotateY: "17",
    rotateZ: "21",
    showToolbar: false,
    zoom: "1",
  },
  {
    gradientStop1: "#6e6fdc",
    gradientStop2: "#18dc0a",
    perspective: "125",
    layout: 4,
    name: "preset44",
    rotateX: "-33",
    rotateY: "-8",
    rotateZ: "35",
    showToolbar: false,
    zoom: "1",
  },
];
const auth = getAuth(firebaseApp);

const generateColorHex = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
const randomizeValue = () => {
  return `${Math.floor(Math.random() * 91) - 45}`;
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

const Editor: NextPage = () => {
  const [perspective, setPerspective] = useState("125");
  const [dark, setDark] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);
  const [rotateX, setRotateX] = useState("0");
  const [rotateY, setRotateY] = useState("0");
  const [rotateZ, setRotateZ] = useState("0");

  const [rotateContainerX, setRotateContainerX] = useState("51");
  const [rotateContainerY, setRotateContainerY] = useState("0");
  const [rotateContainerZ, setRotateContainerZ] = useState("43");
  const [gridGap, setGridGap] = useState("0");
  const [containerZoom, setContainerZoom] = useState("1");
  const [zoom, setZoom] = useState("1");
  const [gradientStop1, setGradientStop1] = useState(generateColorHex);
  const [gradientStop2, setGradientStop2] = useState(generateColorHex);
  const [gapX, setGapX] = useState("0");
  const [gapY, setGapY] = useState("0");
  const [gapZ, setGapZ] = useState("0");
  const [bgColor, setBgColor] = useState(getColor);
  const [layout, setLayout] = useState(4);
  const [preset, setPreset] = useState({});
  const ref = useRef<HTMLDivElement>(null);
  let root: HTMLElement | null = null;
  if (typeof window !== "undefined") {
    root = document.documentElement;
  }
  const getImage = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toJpeg(ref.current, { cacheBust: true, width: 2560, height: 1440 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  const getPreset = (name: string) => {
    return {
      name,
      perspective,
      layout,
      showToolbar,
      rotateX,
      rotateY,
      rotateZ,
      zoom,
      gradientStop1,
      gradientStop2,
    };
  };
  const randomizeXYZ = () => {
    setRotateX(randomizeValue);
    setRotateY(randomizeValue);
    setRotateZ(randomizeValue);
  };

  useEffect(() => {
    if (root) {
      root.style.setProperty("--perspective-var", perspective + "rem");
      root.style.setProperty("--rotateX-var", rotateX + "deg");
      root.style.setProperty("--rotateY-var", rotateY + "deg");
      root.style.setProperty("--zoom-var", zoom);
      root.style.setProperty("--rotateZ-var", rotateZ + "deg");
      root.style.setProperty("--gradient-stop-1", gradientStop1);
      root.style.setProperty("--gradient-stop-2", gradientStop2);
      root.style.setProperty("--gap-x", gapX + "rem");
      root.style.setProperty("--gap-y", gapY + "rem");
      root.style.setProperty("--gap-z", gapZ + "rem");
      root.style.setProperty("--blur", gapZ);
      root.style.setProperty("--container-rotate-x", rotateContainerX + "deg");
      root.style.setProperty("--container-rotate-y", rotateContainerY + "deg");
      root.style.setProperty("--container-rotate-z", rotateContainerZ + "deg");
      root.style.setProperty("--container-zoom", containerZoom);
      root.style.setProperty("--grid-gap", gridGap + "px");
    }
  }, [
    perspective,
    rotateX,
    rotateY,
    rotateZ,
    zoom,
    gradientStop1,
    gradientStop2,
    gapX,
    gapY,
    gapZ,
    containerZoom,
    rotateContainerX,
    rotateContainerY,
    rotateContainerZ,
    gridGap,
  ]);
  useEffect(() => {
    setPreset(getPreset(""));
  }, [
    perspective,
    rotateX,
    rotateY,
    rotateZ,
    zoom,
    gradientStop1,
    gradientStop2,
  ]);
  // const loadPreset = ({
  //   perspective,
  //   rotateX,
  //   rotateY,
  //   rotateZ,
  //   zoom,
  //   gradientStop1,
  //   gradientStop2,
  // }) => {
  //   setPerspective(perspective);
  //   setRotateX(rotateX);
  //   setRotateY(rotateY);
  //   setRotateZ(rotateZ);
  //   setZoom(zoom);
  //   setGradientStop1(gradientStop1);
  //   setGradientStop2(gradientStop2);
  // };

  return (
    <div className="flex justify-between ">
      <div
        className={clsx(
          "flex-1 flex items-center justify-center  grid-effect-light overflow-hidden bg-gray-50"
        )}
      >
        <div className="relative max-w-[1280px] max-h-[720px] w-full h-full">
          <div
            ref={ref}
            className={clsx(
              "overflow-hidden z-10 absolute ",
              dark ? "bg-black" : "bg-white"
            )}
          >
            <div className=" w-full h-full absolute bg-gradient-to-t from-[var(--gradient-stop-1)] to-[var(--gradient-stop-2)]   "></div>
            <div
              className={clsx(
                " relative aspect-video container template7  ",
                layout < 3
                  ? " flex items-center  "
                  : "grid-cols-2 grid   "
              )}
            >
              {images.map(
                (url, index) =>
                  layout >= index + 1 && (
                    <div
                      key={index}
                      className="rounded-xl shadow-2xl overflow-hidden aspect-video relative   "
                    >
                      {showToolbar && <Toolbar type="dark" />}

                      <Image
                        width={2560}
                        height={1440}
                        objectFit="cover"
                        src={`/${url}`}
                      />
                    </div>
                  )
              )}
            </div>
          </div>
          {/* <div className="absolute w-[1280px] h-[720px] bg-blue-600 blur-3xl z-0 scale-105"></div> */}
        </div>
      </div>

      <div className=" z-20 w-full max-w-sm p-5 space-y-3">
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                <span>Controls</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-blue-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 space-y-4 text-sm text-gray-500">
                <h1 className="font-medium border-b-2 pb-1 text-base">
                  Container
                </h1>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative pt-1">
                    <label htmlFor="customRange1" className=" font-medium">
                      rotateY
                    </label>
                    <input
                      min={-180}
                      max={180}
                      onChange={(e) => setRotateContainerY(e.target.value)}
                      value={rotateContainerY}
                      type="range"
                      className="  appearance-none w-full h-1 p-0 focus:outline-none focus:ring-0 focus:shadow-none bg-blue-500 rounded-full slider"
                      id="customRange1"
                    />
                  </div>
                  <div className="relative pt-1">
                    <label htmlFor="customRange1" className=" font-medium">
                      Grid gap
                    </label>
                    <input
                      min={0}
                      max={180}
                      onChange={(e) => setGridGap(e.target.value)}
                      value={gridGap}
                      type="range"
                      className="  appearance-none w-full h-1 p-0 focus:outline-none focus:ring-0 focus:shadow-none bg-blue-500 rounded-full slider "
                      id="customRange1"
                    />
                  </div>
                  <div className="relative pt-1">
                    <label htmlFor="customRange1" className=" font-medium">
                      rotateX
                    </label>
                    <input
                      onChange={(e) => setRotateContainerX(e.target.value)}
                      value={rotateContainerX}
                      min={-180}
                      max={180}
                      type="range"
                      className="  appearance-none w-full h-1 p-0 focus:outline-none focus:ring-0 focus:shadow-none bg-blue-500 rounded-full slider "
                      id="customRange1"
                    />
                  </div>
                  <div className="relative pt-1">
                    <label htmlFor="customRange1" className=" font-medium">
                      zoom
                    </label>
                    <input
                      onChange={(e) => setContainerZoom(e.target.value)}
                      value={containerZoom}
                      step={0.1}
                      min={0.1}
                      max={5}
                      type="range"
                      className="  appearance-none w-full h-1 p-0 focus:outline-none focus:ring-0 focus:shadow-none bg-blue-500 rounded-full slider "
                      id="customRange1"
                    />
                  </div>
                  <div className="relative pt-1">
                    <label htmlFor="customRange1" className=" font-medium">
                     rotateZ
                    </label>
                    <input
                      onChange={(e) => setRotateContainerZ(e.target.value)}
                      value={rotateContainerZ}
                      min={-180}
                      max={180}
                      type="range"
                      className="appearance-none w-full h-1 p-0 focus:outline-none focus:ring-0 focus:shadow-none bg-blue-500 rounded-full slider"
                      id="customRange1"
                    />
                  </div>
                </div>
                <h1 className="font-medium border-b-2 pb-1 text-base">Image</h1>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative pt-1">
                    <label htmlFor="customRange1" className=" font-medium">
                      perspective
                    </label>
                    <input
                      min={0}
                      max={250}
                      onChange={(e) => setPerspective(e.target.value)}
                      value={perspective}
                      type="range"
                      className="  appearance-none w-full h-1 p-0 focus:outline-none focus:ring-0 focus:shadow-none bg-blue-500 rounded-full slider"
                      id="customRange1"
                    />
                  </div>
                  <div className="relative pt-1">
                    <label htmlFor="customRange1" className=" font-medium">
                      rotateY
                    </label>
                    <input
                      min={-180}
                      max={180}
                      onChange={(e) => setRotateY(e.target.value)}
                      value={rotateY}
                      type="range"
                      className="  appearance-none w-full h-1 p-0 focus:outline-none focus:ring-0 focus:shadow-none bg-blue-500 rounded-full slider"
                      id="customRange1"
                    />
                  </div>
                  <div className="relative pt-1">
                    <label htmlFor="customRange1" className=" font-medium">
                      rotateX
                    </label>
                    <input
                      onChange={(e) => setRotateX(e.target.value)}
                      value={rotateX}
                      min={-180}
                      max={180}
                      type="range"
                      className="  appearance-none w-full h-1 p-0 focus:outline-none focus:ring-0 focus:shadow-none bg-blue-500 rounded-full slider "
                      id="customRange1"
                    />
                  </div>
                  <div className="relative pt-1">
                    <label htmlFor="customRange1" className=" font-medium">
                      zoom
                    </label>
                    <input
                      onChange={(e) => setZoom(e.target.value)}
                      value={zoom}
                      step={0.1}
                      min={0.1}
                      max={5}
                      type="range"
                      className="  appearance-none w-full h-1 p-0 focus:outline-none focus:ring-0 focus:shadow-none bg-blue-500 rounded-full slider "
                      id="customRange1"
                    />
                  </div>
                  <div className="relative pt-1">
                    <label htmlFor="customRange1" className=" font-medium">
                      rotateZ
                    </label>
                    <input
                      onChange={(e) => setRotateZ(e.target.value)}
                      value={rotateZ}
                      min={-180}
                      max={180}
                      type="range"
                      className="appearance-none w-full h-1 p-0 focus:outline-none focus:ring-0 focus:shadow-none bg-blue-500 rounded-full slider"
                      id="customRange1"
                    />
                  </div>
                  <div className="relative pt-1">
                    <label htmlFor="customRange1" className=" font-medium">
                      gap-x
                    </label>
                    <input
                      onChange={(e) => setGapX(e.target.value)}
                      value={gapX}
                      min={-50}
                      max={50}
                      type="range"
                      className="appearance-none w-full h-1 p-0 focus:outline-none focus:ring-0 focus:shadow-none bg-blue-500 rounded-full slider"
                      id="customRange1"
                    />
                  </div>
                  <div className="relative pt-1">
                    <label htmlFor="customRange1" className=" font-medium">
                      gap-y
                    </label>
                    <input
                      onChange={(e) => setGapY(e.target.value)}
                      value={gapY}
                      min={-50}
                      max={50}
                      type="range"
                      className="appearance-none w-full h-1 p-0 focus:outline-none focus:ring-0 focus:shadow-none bg-blue-500 rounded-full slider"
                      id="customRange1"
                    />
                  </div>
                  <div className="relative pt-1">
                    <label htmlFor="customRange1" className=" font-medium">
                      gap-z
                    </label>
                    <input
                      onChange={(e) => setGapZ(e.target.value)}
                      value={gapZ}
                      step={0.05}
                      min={-1}
                      max={0}
                      type="range"
                      className="appearance-none w-full h-1 p-0 focus:outline-none focus:ring-0 focus:shadow-none bg-blue-500 rounded-full slider"
                      id="customRange1"
                    />
                  </div>
                </div>

                <div className="grid gap-3 grid-cols-2">
               
                  <button
                    onClick={() => setShowToolbar(!showToolbar)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 "
                  >
                    toggle toolbar
                  </button>
                  <button
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 "
                    onClick={getImage}
                  >
                    download
                  </button>
            
                  <div className="flex">
                    <ColorPicker
                      cssVariable="gradient1"
                      color={gradientStop1}
                      setColor={setGradientStop1}
                    />
                    <ColorPicker
                      cssVariable="gradient2"
                      color={gradientStop2}
                      setColor={setGradientStop2}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      layout
                    </label>
                    <select
                      value={layout}
                      onChange={(e) => setLayout(parseInt(e.target.value))}
                      id="location"
                      name="location"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      defaultValue="Canada"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                <span>Presets</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-blue-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 grid grid-cols-2 gap-4 rounded-full">
                {presets.map((item) => (
                  <div className="space-y-2">
                    <h1 className="text-black font-medium">{item.name}</h1>
                    <button>
                      <img
                        className="rounded shadow-lg border-2 border-blue-500"
                        src={`${item.name}.png`}
                      />
                    </button>
                  </div>
                ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default Editor;
