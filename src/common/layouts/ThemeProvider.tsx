import clsx from "clsx";
import { NextPage } from "next";
import { useEffect, useState } from "react";

interface ThemeProps {
  children: React.ReactNode;
  theme: "light" | "dark" | "system";
}
const ThemeProvider: NextPage<ThemeProps> = ({ children, theme }) => {
  const [prefersDark, setPrefersDark] = useState(true);
  useEffect(() => {
    window.matchMedia("(prefers-color-scheme: dark)").matches &&
      setPrefersDark(true);
  }, []);
  return (
    <div
      className={clsx(
        (theme === "system" && prefersDark) || theme === "dark" ? "dark" : ""
      )}
    >
      {children}
    </div>
  );
};

export default ThemeProvider;
