"use client";
import { backendImageUrl } from "@/shared/lib/constants";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui";
import { default as NextImage } from "next/image";
import { useEffect, useState } from "react";
interface Link {
  name: string;
  link: string;
  image: string;
}
export interface LinksProps {
  title: string;
  items: Link[];
}
function ImageLinksClient({ title, items }: LinksProps) {
  return (
    <section className="grid  gap-10  pb-10 md:pb-0">
      <h2 className="text-2xl text-base2 font-bold">{title}</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full justify-self-center max-w-[20rem]  md:max-w-3xl lg:max-w-4xl xl:max-w-5xl"
      >
        <CarouselContent className="">
          {items.map((li, idx) => (
            <Item key={idx} li={li} idx={idx} />
          ))}
        </CarouselContent>
        <CarouselPrevious>a</CarouselPrevious>
        <CarouselNext>a</CarouselNext>
      </Carousel>
    </section>
  );
}
const Item = ({ li, idx }: { li: Link; idx: number }) => {
  return (
    <CarouselItem className="basis-[100%] flex items-center justify-center     lg:basis-1/3">
      <a
        href={li.link}
        target="_blank"
        className="flex items-center justify-center flex-col"
      >
        <img
          src={`${backendImageUrl}${li.image}`}
          className="max-w-[120px]  h-auto"
          alt={li.name ?? `carousel item ${idx}`}
        />
        {/* <span className="text-center block ">{li.name}</span> */}
      </a>
    </CarouselItem>
  );
};
export { ImageLinksClient };
