import clsx from "clsx";
import { NextComponentType, NextPageContext } from "next";
import Image from "next/image";
interface LoaderProps {}
const Loader: NextComponentType<NextPageContext, {}, LoaderProps> = ({}) => {
  return (
    <Image
      className="loader"
      alt="loading animation"
      height={50}
      width={50}
      src="/logo_short.png"
    />
  );
};
export default Loader;
