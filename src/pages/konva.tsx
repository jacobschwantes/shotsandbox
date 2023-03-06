import { ImageDoc } from "@customTypes/configs"
import { Images } from "@modules/editor/components"
import { uniqueId } from "lodash"
import dynamic from "next/dynamic"
import { useState } from "react"
const NoSSRKonva = dynamic(() => import('../modules/editor/components/Konva'), {ssr: false})
export default function App () {
const [imageStack, setImageStack] = useState([
    {
      id: uniqueId(),
      fileName: "sample.jpeg",
      src: "/sample.jpeg",
      x: 150,
      y: 150,
      width: 100,
      height: 100,
    },
  ] as ImageDoc[]);
const addImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageStack((current: ImageDoc[]) => [
        ...current,
        {
          id: uniqueId(),
          fileName: file.name,
          src: URL.createObjectURL(file),
          x: 150,
          y: 150,
          width: 100,
          height: 100,
        }
      ]);
    }
  };
    return (
        <div className="">
        <Images addImage={addImage} />
        <NoSSRKonva imageStack={imageStack} setImageStack={setImageStack} />
        
        </div>
    )
}

