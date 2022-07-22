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
import firebase from "@modules/auth/firebase/clientApp";
// Import the useAuthStateHook
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut, getAuth } from "firebase/auth";
import {firebaseApp} from "@modules/auth/firebase/clientApp";
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
  const [rotateX, setRotateX] = useState(randomizeValue);
  const [rotateY, setRotateY] = useState(randomizeValue);
  const [rotateZ, setRotateZ] = useState(randomizeValue);
  const [zoom, setZoom] = useState("1");
  const [gradientStop1, setGradientStop1] = useState(generateColorHex);
  const [gradientStop2, setGradientStop2] = useState(generateColorHex);
  const [bgColor, setBgColor] = useState(getColor);
  const [layout, setLayout] = useState(4);
  const [preset, setPreset] = useState({});
  const ref = useRef<HTMLDivElement>(null);
  let root = null;
  if (typeof window !== "undefined") {
    root = document.documentElement;
  }
  const getImage = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toJpeg(ref.current, { cacheBust: true })
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
    root.style.setProperty("--perspective-var", perspective + "rem");
    root.style.setProperty("--rotateX-var", rotateX + "deg");
    root.style.setProperty("--rotateY-var", rotateY + "deg");
    root.style.setProperty("--zoom-var", zoom);
    root.style.setProperty("--rotateZ-var", rotateZ + "deg");
    root.style.setProperty("--gradient-stop-1", gradientStop1);
    root.style.setProperty("--gradient-stop-2", gradientStop2);
  }, [
    perspective,
    rotateX,
    rotateY,
    rotateZ,
    zoom,
    gradientStop1,
    gradientStop2,
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
  const loadPreset = ({perspective, rotateX, rotateY, rotateZ, zoom, gradientStop1, gradientStop2}) => {
    setPerspective(perspective);
    setRotateX(rotateX);
    setRotateY(rotateY);
    setRotateZ(rotateZ);
    setZoom(zoom);
    setGradientStop1(gradientStop1);
    setGradientStop2(gradientStop2);
  }

  return (
    <div className="flex-1 flex justify-between h-full">
      <div
        className={clsx(
          "flex-1 flex items-center justify-center  grid-effect-light overflow-hidden bg-gray-50"
        )}
      >
        <div className="relative max-w-[1280px] max-h-[720px] w-full h-full">
          <div
            ref={ref}
            className={clsx(
              "overflow-hidden z-10 absolute",
              dark ? "bg-black" : "bg-white"
            )}
          >
            <div
              className={clsx(` grid grid-cols-2 grid-rows-2 gap-5  relative `)}
            >
              <div className="absolute w-full h-full bg-gradient-to-t from-[var(--gradient-stop-1)] to-[var(--gradient-stop-2)] "></div>
              {images.map((url, index) => (
                <div
                  key={index}
                  className="rounded-xl flex flex-col items-center shadow-2xl overflow-hidden first:template3 last:template3 template4  "
                >
                  {showToolbar && <Toolbar type="light" />}

                  <Image
                    width={2560}
                    height={1440}
                    objectFit="cover"
                    src={`/${url}`}
                  />
                </div>
              ))}
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
                <div className="">
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
                </div>
                <div className="grid gap-2 grid-cols-2">
                  <button
                    onClick={() => setDark(!dark)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 "
                  >
                    switch dark
                  </button>
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
                  <button
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 "
                    onClick={randomizeXYZ}
                  >
                    randomize
                  </button>
                  <button
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    onClick={getColor}
                  >
                    getcolor
                  </button>
                  <button
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    onClick={() =>
                      console.log(
                        getPreset(`preset${Math.floor(Math.random() * 100)}`)
                      )
                    }
                  >
                    getPreset
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
                    <button onClick={() => loadPreset(item)}>
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
