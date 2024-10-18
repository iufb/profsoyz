"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface AnimatedTextProps {
  text: string[];
  className?: string;
}
export const AnimatedText = ({ text, className }: AnimatedTextProps) => {
  const [activeText, setActiveText] = useState(0);
  const [fade, setFade] = useState("fade-in");

  useEffect(() => {
    const interval = setInterval(() => {
      setFade("fade-out");
      setTimeout(() => {
        setActiveText((prev) => (prev >= text.length - 1 ? 0 : prev + 1));
        setFade("fade-in");
      }, 1600); // Match this duration with the fade-out animation duration
    }, 6000);

    return () => clearInterval(interval);
  }, [text.length]);

  return (
    <h1
      className={clsx(
        "font-bold  text-md md:justify-self-center  flex justify-center items-center   w-full   text-center  md:text-wrap ",
        fade == "fade-in" ? "animate-fadeIn " : "animate-fadeOut ",
        className,
      )}
    >
      {text[activeText]}
    </h1>
  );
};
