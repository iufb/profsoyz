import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";
export interface CardProps {
  variant: "horizontal" | "base";
  children: ReactNode;
  src: string;
  date: string;
  title: string;
}
export const Card = ({ variant, children, src, date, title }: CardProps) => {
  return (
    <div
      className={cn(
        {
          horizontal:
            "w-full grid grid-cols-[1fr_2fr] gap-2 h-[200px]  after:bottom-0 after:top-0   after:left-0 after:-right-[3px]  ",
          base: "flex w-full  h-[308px] flex-col after:-bottom-[3px] after:top-0 after:left-0 after:right-0 ",
        }[variant],
        "after:bg-cyan-400 after:-z-10 after:rounded-md after:absolute  bg-slate-100 p-4 rounded-md relative"
      )}
    >
      <div
        className={cn(
          {
            base: "flex-grow-1 h-[70%] ",
            horizontal: "col-start-1 col-end-2 ",
          }[variant],
          "relative "
        )}
      >
        <Image
          src={src}
          fill
          alt="te"
          className="absolute left-0 right-0 top-0 bottom-0 "
        />
      </div>
      <div>
        <span className="text-sm">{date}</span>
        <h2 className="font-bold text-xl">{title}</h2>
        <p className="">{children?.toString().slice(0, 90)}...</p>
      </div>
    </div>
  );
};
