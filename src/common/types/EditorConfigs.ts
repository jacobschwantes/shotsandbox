export type ImageDoc = {
  id: string;
  fileName: string;
  src: string;
};
export type BackgroundConfig = {
  color?: string;
  gradient?: {
    stops: string[];
    direction: number;
  };
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
  id: string;
  name: string;
  size: SizeConfig;
  orientation: OrientationConfig;
  position: PositionConfig;
  border: BorderConfig;
  background: BackgroundConfig;
  shadow: ShadowConfig;
  frame: FrameConfig;
};
