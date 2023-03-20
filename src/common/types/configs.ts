export type ImageDoc = {
  id: string;
  fileName: string;
  src: string;
};
export type GradientConfig = {
  stops: { color: string; id: number | string }[];
  direction: number;
};
export type BackgroundConfig = {
  color: string;
  gradient: GradientConfig;
  type: "solid" | "gradient" | "transparent";
};
export type OrientationConfig = {
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  perspective: number;
};
export type PositionConfig = {
  x: number;
  y: number;
};
export type HeaderConfig = {
  show: boolean;
  anchored: boolean;
  align: "horizontal" | "vertical";
  content: {
    title: string;
    subtitle: string;
    color: string;
    bold: boolean;
    italic: boolean;
    size: number;
    padding: number;
    translateX: number;
  };
};
export type SizeConfig = {
  scale: number;
  dimensions: {
    aspectRatio: string;
    width: number;
    height: number;
  };
};
export type BorderConfig = {
  radius: number;
  width: number;
  color: string;
};
export type ShadowConfig = {
  type: string;
  previewSize: string;
  size: string;
  color: string;
};
export type WatermarkConfig = {
  show: boolean;
  theme: "light" | "dark";
  placement: "top-right" | "top-left" | "bottom-left" | "bottom-right";
};
export type FrameConfig = {
  show: boolean;
  dark: boolean;
  opacity: number;
  buttons: {
    show: boolean;
    dark: boolean;
    solid: boolean;
  };
  searchBar: {
    show: boolean;
  };
};
export type Config = {
  preview: Blob | string;
  id: string;
  name: string;
  size: SizeConfig;
  header: HeaderConfig;
  orientation: OrientationConfig;
  position: PositionConfig;
  border: BorderConfig;
  background: BackgroundConfig;
  shadow: ShadowConfig;
  frame: FrameConfig;
  watermark: WatermarkConfig;
};
