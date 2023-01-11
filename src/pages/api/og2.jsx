import { ImageResponse } from "@vercel/og";
import clsx from "clsx";
import { Toolbar } from "../../modules/editor/components/Frames";
export const config = {
  runtime: "experimental-edge",
};

const preset = {
  id: "preset1",
  name: "default",
  size: {
    scale: 80,
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
    color: "#252525",
    gradient: {
      stops: [
        { color: "#cd96b3", id: "664" },
        { color: "#bda6f0", id: "356" },
      ],
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
    radius: 0.8,
    width: 0,
    color: "rgba(0, 0, 0, 1)",
  },
  header: {
    show: false,
    anchored: false,
    align: "vertical",
    content: {
      title: "The best image editing tool for founders",
      subtitle: "Turn boring screenshots into stunning graphics",
      color: "rgba(255, 255, 255, 1)",
      bold: true,
      italic: false,
      size: 3.5,
      padding: 5,
      translateX: 0,
    },
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
  watermark: {
    show: true,
    placement: "bottom-right",
    theme: "light",
  },
};
const removeBackground = false;


export default function (req) {
  const { searchParams } = new URL(req.url);

  // ?title=<title>
  const hasTitle = searchParams.has('title');
  const title = hasTitle
    ? searchParams.get('title')?.slice(0, 100)
    : 'My default title';


  return new ImageResponse(
    (
      <div
  style={{
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: `linear-gradient(160deg, #ede5de, #e5f2f5)`,
    
    justifyContent: 'center',
    backgroundColor: '#fff',
  }}
>
<img tw=" h-3/4 rounded-3xl" style={{boxShadow: `  0px 50px 100px rgba(17, 12, 46, 0.15)`}} src={`${title}`} />
 

</div>
    ),
    { width: 1920, height: 1080 }
  );
}
