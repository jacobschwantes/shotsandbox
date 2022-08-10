export type ImageDoc = {
  id: string;
  fileName: string;
  src: string;
};
export type BackgroundConfig = {
  gradient: {
    colors: string[];
    direction: number;
  };
};
export type PositionConfig = {
  x: number;
  y: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
};
export type SizeConfig = {
  scale: number;
  perspective: number;
  dimensions: {
    scaleFactor: string;
    width: string;
    height: string;
  };
};
export type ShadowConfig = {
  type: string;
  size: string;
  color?: string;
};
export type FrameConfig = {
  borderRadius: number;
  mockup: {
    type: string;
    theme: string;
  };
};
export type Config = {
  id: string;
  name: string;
  size: SizeConfig;
  position: PositionConfig;
  background: BackgroundConfig;
  shadow: ShadowConfig;
  frame: FrameConfig;
};
