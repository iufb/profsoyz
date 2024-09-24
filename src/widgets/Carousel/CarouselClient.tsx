"use client";
import { backendImageUrl } from "@/shared/lib/constants";
import { cn } from "@/shared/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Carousel as CarouselUI,
} from "@/shared/ui";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
type CarouselItemType = {
  image: string;
  title: string;
  content: string;
  href?: string;
};
export interface CarouselProps {
  items: CarouselItemType[];
  position: "left" | "center" | "right";
}
const CarouselClient = ({ items, position }: CarouselProps) => {
  const params = useParams();
  return (
    <section className="w-full flex items-center px-2  justify-center">
      <CarouselUI
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full mb-20  md:max-w-[80%]  "
      >
        <CarouselContent>
          {items.map((item, idx) => {
            const Comp = item.href
              ? (Link as React.ElementType)
              : ("div" as "div");
            return (
              <CarouselItem key={idx}>
                <div className="p-1  ">
                  <Card className="py-0 px-1 md:p-4 flex flex-col bg-base3  gap-4">
                    <CardTitle>{item.title}</CardTitle>
                    <CardContent className="flex   cursor-grab overflow-hidden   items-center justify-center p-1  ">
                      <Comp
                        href={`/${params.locale}/${item.href}`}
                        className="relative w-full h-[200px] md:h-[400px]"
                      >
                        <Image
                          src={`${backendImageUrl}/${item.image}`}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="absolute object-cover rounded-md"
                          fill
                          style={{ objectFit: "cover" }}
                          alt={item.title ?? `carousel item ${idx}`}
                        />
                      </Comp>
                    </CardContent>
                    <CardDescription
                      className={clsx("text-justify text-white")}
                    >
                      {item.content}
                    </CardDescription>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious>a</CarouselPrevious>
        <CarouselNext>a</CarouselNext>
      </CarouselUI>
    </section>
  );
};
export { CarouselClient };
