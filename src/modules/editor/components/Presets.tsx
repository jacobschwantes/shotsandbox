import Tabs from "@components/Tabs";
import { Config } from "@customTypes/configs";
import { NextPageContext, NextComponentType } from "next";
import { useState } from "react";
import { usePresets } from "@hooks/swr";
interface PresetsProps {
  updateConfig: (newConfig: Partial<Config>) => void;
  presets: Partial<Config>[];
  idToken: string;
}
const Presets: NextComponentType<NextPageContext, {}, PresetsProps> = ({
  presets,
  updateConfig,
  idToken,
}) => {
  const [selected, setSelected] = useState("global");
  const { data, isLoading, isError } = usePresets(idToken);
  return (
    <>
      <Tabs
        tabs={["global", "custom"]}
        selected={selected}
        setSelected={setSelected}
      >
        {selected === "global" ? (
          <div className="space-y-10 mt-10">
            {presets.map((config, index) => (
              <button
                key={index}
                onClick={() => {
                  updateConfig(config);
                }}
                className="border rounded-xl border-zinc-900 overflow-hidden"
              >
                <img src={config.preview}></img>
              </button>
            ))}
          </div>
        ) : !isLoading && !isError ? (
          <div className="space-y-10 mt-10">
            //@ts-ignore
            {data.presets.map((preset, index) => (
              <div>
                <button
                  key={index}
                  onClick={() => {
                    updateConfig(preset.config);
                  }}
                  className="border rounded-xl border-zinc-900 overflow-hidden"
                >
                  <img
                    onError={(e: any) => (e.target.src = "preset_1.png")}
                    src={`https://cloud.screenshotify.io/previews/${preset.id}`}
                  ></img>
                </button>
                <h1 className="text-white">{preset.id}</h1>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-white">{isError.message}</h1>
        )}
      </Tabs>
    </>
  );
};
export default Presets;
