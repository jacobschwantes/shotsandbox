//@ts-nocheck
import * as React from "react";
import Moveable from "react-moveable";
import { Frame } from "scenejs";

export default function Movable({children}) {
  const [targets, setTargets] = React.useState(null);
  const [frames, setFrames] = React.useState(null);
  const containerRef = React.useRef(null);
  const moveableRef = React.useRef<Moveable>(null);
  const onWindowResize = React.useCallback(() => {
    moveableRef.current.updateTarget();
  }, []);

  React.useEffect(() => {
    const nextTargets = [].slice.call(document.querySelectorAll(".target"));
    setTargets(nextTargets);
    setFrames(
      nextTargets.map(
        frame =>
          new Frame(
            "transform: translateX(0px) translateY(0px) rotate(0deg) scaleX(1), scaleY(1)"
          )
      )
    );
    window.addEventListener("resize", onWindowResize);
    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, [onWindowResize]);
  return (
    <div className="page main">
      <Moveable
        ref={moveableRef}
        target={targets}
        pinchThreshold={20}
        container={null}
        keepRatio={false}
        draggable={true}
        scalable={true}
        rotatable={true}
        origin={false}
        throttleDrag={1}
        throttleRotate={0.2}
        throttleResize={1}
        throttleScale={0.01}
        onDragGroupStart={e => {
          e.events.forEach(({ set }, i) => {
            const frame = frames[i];

            set([
              parseFloat(frame.get("transform", "translateX")),
              parseFloat(frame.get("transform", "translateY"))
            ]);
          });
        }}
        onDragGroup={e => {
          e.events.forEach((ev, i) => {
            const frame = frames[i];

            frame.set("transform", "translateX", `${ev.beforeTranslate[0]}px`);
            frame.set("transform", "translateY", `${ev.beforeTranslate[1]}px`);
            ev.target.style.cssText += frame.toCSS();
          });
        }}
        onScaleGroupStart={e => {
          e.events.forEach(({ set, dragStart }, i) => {
            const frame = frames[i];

            set([
              frame.get("transform", "scaleX"),
              frame.get("transform", "scaleY")
            ]);
            dragStart &&
              dragStart.set([
                parseFloat(frame.get("transform", "translateX")),
                parseFloat(frame.get("transform", "translateY"))
              ]);
          });
        }}
        onScaleGroup={e => {
          e.events.forEach((ev, i) => {
            const frame = frames[i];

            frame.set("transform", "scaleX", ev.scale[0]);
            frame.set("transform", "scaleY", ev.scale[1]);

            frame.set(
              "transform",
              "translateX",
              `${ev.drag.beforeTranslate[0]}px`
            );
            frame.set(
              "transform",
              "translateY",
              `${ev.drag.beforeTranslate[1]}px`
            );
            ev.target.style.cssText += frame.toCSS();
          });
        }}
        onRotateGroupStart={e => {
          e.events.forEach(({ set, dragStart }, i) => {
            const frame = frames[i];

            set(parseFloat(frame.get("transform", "rotate")));
            dragStart &&
              dragStart.set([
                parseFloat(frame.get("transform", "translateX")),
                parseFloat(frame.get("transform", "translateY"))
              ]);
          });
        }}
        onRotateGroup={e => {
          e.events.forEach((ev, i) => {
            const frame = frames[i];

            frame.set("transform", "rotate", `${ev.beforeRotate}deg`);

            frame.set(
              "transform",
              "translateX",
              `${ev.drag.beforeTranslate[0]}px`
            );
            frame.set(
              "transform",
              "translateY",
              `${ev.drag.beforeTranslate[1]}px`
            );
            ev.target.style.cssText += frame.toCSS();
          });
        }}
      />
      
      <div className="w-screen h-screen">
        
    
        <div className=" p-5 h-20 w-20 bg-red-500 target absolute" id="target2">
          target2
        </div>
  
       
      </div>
    </div>
  );
}

