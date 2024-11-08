"use client";
import { backendImageUrl } from "@/shared/lib/constants";
import { cn } from "@/shared/lib/utils";
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
            "w-full grid grid-cols-1 grid-rows-[1fr,auto]  md:grid-cols-[1fr_2fr] gap-2 h-[200px]  after:bottom-0 after:top-0   after:left-0 after:-right-[6px]  ",
          base: "flex w-full  h-[308px] flex-col after:-bottom-[6px] after:top-0 after:left-0 after:right-0  ",
        }[variant],
        "after:bg-base4 after:-z-10 after:rounded-md after:absolute text-base2  bg-base6 p-2 rounded-md relative min-h-[400px] ",
      )}
    >
      <div
        className={cn(
          {
            base: "flex-grow-1 h-[80%] ",
            horizontal: "col-start-1 col-end-2 ",
          }[variant],
          "relative ",
        )}
      >
        <Image
          src={`${backendImageUrl}/${image}`}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={title}
          className="absolute rounded-sm left-0 right-0 top-0 bottom-0 "
        />
      </div>
      <div>
        <span className="text-sm">{date}</span>
        <h2 className="font-bold text-center text-md">
          {title.length > 70 ? `${title.slice(0, 70)}...` : title}
        </h2>
        {variant == "horizontal" && (
          <p className="text-md hidden md:block">
            {content.length > 410 ? `${content.slice(0, 410)}...` : content}
          </p>
        )}
      </div>
    </Comp>
  );
};
