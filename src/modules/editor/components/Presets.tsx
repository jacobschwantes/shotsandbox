import Tabs from "@components/Tabs";
import { Config } from "@customTypes/configs";
import { NextPageContext, NextComponentType } from "next";
import { useState } from "react";
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
  return (
    <>
      <Tabs
        tabs={["global", "custom"]}
        selected={selected}
        setSelected={setSelected}
      >
        {selected === "global" ? (
          <div className="space-y-10 mt-10">
            {/* {presets.map((config, index) => (
              <button
                key={index}
                onClick={() => {
                  updateConfig(config);
                }}
                className="border rounded-xl border-zinc-900 overflow-hidden"
              >
                <img src={config.preview}></img>
              </button>
            ))} */}
          </div>
        ) : (
          <></>
        )}
      </Tabs>
    </>
  );
};
export default Presets;
