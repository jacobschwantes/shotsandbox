import { resolveTxt } from "dns";
import React, { useCallback, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Stage, Layer, Rect, Transformer, Image } from "react-konva";
import useImage from "use-image";
import { flushSync } from "react-dom";
import { downloadPng } from "../utils/export";

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange, image }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();
  const [imageNew] = useImage(image);
  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Image
        alt="image"
        image={imageNew}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

const initialRectangles = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: "red",
    id: "rect1",
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: "green",
    id: "rect2",
  },
];

const KonvaStage = ({ imageStack, setImageStack }) => {
  // const [rectangles, setRectangles] = React.useState(initialRectangles);
  const [selectedId, selectShape] = useState(null);
  const stageRef = useRef(null);
  const sceneRef = useRef(null);
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };
  const handleClick = () => {
    flushSync(() => {
      selectShape(null);
    });
    exportImage();
  };
  const exportImage = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement("a");
    link.download = "my-image-name.png";
    link.href = uri;
    link.click();
  };
  const getImage = useCallback(
    (format: string) => {
      if (sceneRef.current === null) {
        return;
      }
      if (false) {
        toast("do not try to modify watermark", { type: "error" });
      } else {
        switch (format) {
          case "png":
            downloadPng(sceneRef.current, {
              width: 1920,
              height: 1080,
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
    [sceneRef]
  );
  const angleInDeg = 140;

  // Compute angle in radians - CSS starts from 180 degrees and goes clockwise
  // Math functions start from 0 and go anti-clockwise so we use 180 - angleInDeg to convert between the two
  const angle = ((180 - angleInDeg) / 180) * Math.PI;

  // This computes the length such that the start/stop points will be at the corners
  const length =
    Math.abs(window.innerWidth * Math.sin(angle)) +
    Math.abs(window.innerHeight * Math.cos(angle));

  // Compute the actual x,y points based on the angle, length of the gradient line and the center of the div
  const halfx = (Math.sin(angle) * length) / 2.0;
  const halfy = (Math.cos(angle) * length) / 2.0;
  const cx = window.innerWidth / 2.0;
  const cy = window.innerHeight / 2.0;
  const x1 = cx - halfx;
  const y1 = cy - halfy;
  const x2 = cx + halfx;
  const y2 = cy + halfy;
  return (
    <div ref={sceneRef} 
    >
      <button onClick={() => getImage("png")}>export</button>
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
          <Rect
          
            name="transparentBackground"
            width={window.innerWidth}
            height={window.innerHeight}
            x={0}
            y={0}
            fillPriority="linear-gradient" // 'color', 'pattern', 'linear-gradient', 'radial-gradient'
            /* linear-gradient */
            fillLinearGradientStartPoint={{ x: x1, y: y1 }}
            fillLinearGradientEndPoint={{ x: x2, y: y2 }}
            fillLinearGradientColorStops={[
              0,
              "rgba(165, 142, 251, 1)",
              1,
              "rgb(233, 191, 248)",
            ]}
          />
          {imageStack.map((item, i) => {
            return (
              <Rectangle
                image={item.src}
                key={i}
                shapeProps={item}
                isSelected={item.id === selectedId}
                onSelect={() => {
                  selectShape(item.id);
                }}
                onChange={(newAttrs) => {
                  const rects = imageStack.slice();
                  rects[i] = newAttrs;
                  setImageStack(rects);
                }}
              />
            );
          })}
        </Layer>
      
      </Stage>
    </div>
  );
};
export default KonvaStage;
