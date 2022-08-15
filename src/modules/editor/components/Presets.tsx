import { Config } from "@customTypes/configs";
import { NextPageContext, NextComponentType } from "next";
interface PresetsProps {
  updateConfig: (newConfig: Config) => void;
  presets: Config[];
}
const Presets: NextComponentType<NextPageContext, {}, PresetsProps> = ({
  presets,
  updateConfig,
}) => (
  <>
    {presets.map((config) => (
      <button
        onClick={() => {
          updateConfig(config);
        }}
        className="border rounded-xl border-zinc-900 overflow-hidden"
      >
        <img src={config.preview}></img>
      </button>
    ))}
  </>
);
export default Presets;