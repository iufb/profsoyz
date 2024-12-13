"use client";
import { backendImageUrl } from "@/shared/lib/constants";
import { cn } from "@/shared/lib/utils";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ReactNode } from "react";
export interface CardProps {
  variant: "horizontal" | "base";
  content: string;
  image: string;
  date: string;
  title: string;
  href?: string;
}
export const Card = ({
  variant,
  href,
  content,
  image,
  date,
  title,
}: CardProps) => {
  const Comp = href ? (Link as React.ElementType) : ("div" as "div");
  const params = useParams();

  return (
    <Comp
      href={`/${params.locale}${href}`}
      className={cn(
        {
          horizontal:
            " h-full md:h-[250px] grid grid-cols-1  grid-rows-[1fr,auto]  md:grid-cols-[auto_1fr] gap-2   after:bottom-0 after:top-0   after:left-0 after:-right-[6px] w-[90%]  ",
          base: "flex w-full  h-[308px] flex-col after:-bottom-[6px] after:top-0 after:left-0 after:right-0   ",
        }[variant],
        "after:bg-base4 after:-z-10 after:rounded-md after:absolute text-base2  bg-base6 p-2 rounded-md relative   ",
      )}
    >
      <div
        className={cn(
          {
            base: "flex-grow-1 h-[80%] ",
            horizontal: "col-start-1 col-end-2 ",
          }[variant],
          "relative  ",
        )}
      >
        {variant == "base" ? (
          <Image
            src={`${backendImageUrl}/${image}`}
            fill
            style={{ objectFit: "cover" }}
            alt={title}
            className="absolute rounded-sm left-0 right-0 top-0 bottom-0 "
          />
        ) : (
          <Image
            src={`${backendImageUrl}/${image}`}
            width={230}
            height={230}
            className="rounded-sm"
            alt={title}
          />
        )}
      </div>
      <div>
        <span className="text-sm">{date}</span>
        <h2
          className={clsx(
            "font-bold text-center text-md",
            variant == "horizontal" && "text-lg md:text-xl",
          )}
        >
          {title.length > 70 ? `${title.slice(0, 70)}...` : title}
        </h2>
        {variant == "horizontal" && (
          <>
            <div
              className={clsx(
                "quill-content",
                "overflow-x-auto overflow-y-hidden p-10",
              )}
              dangerouslySetInnerHTML={{
                __html: content
                  .replace(/&lt;/g, "<")
                  .replace(/&gt;/g, ">")
                  .replace(/&amp;nbsp;/g, " "),
              }}
            />
            <div className="w-full h-[2px] bg-slate-200" />
          </>
        )}
      </div>
    </Comp>
  );
};
