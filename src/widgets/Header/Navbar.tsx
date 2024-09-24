"use client";

import { getNavbarPages } from "@/shared/api/pages";
import { NavPage } from "@/shared/lib/types";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Skeleton,
} from "@/shared/ui";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const params = useParams();
  const {
    data: pages,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["navbar"],
    queryFn: async () => {
      if (!Array.isArray(params.locale)) {
        const pages = await getNavbarPages(params.locale);
        return pages;
      }
    },
    refetchOnWindowFocus: false,
  });

  const [scrolled, setScrolled] = useState(false);
  const [navItemNumber, setNavItemNumber] = useState(5);
  useEffect(() => {
    if (window) {
      window.addEventListener("resize", () => {
        if (window.innerWidth >= 1100) {
          setNavItemNumber(5);
        } else {
          setNavItemNumber(3);
        }
      });
    }
  }, []);
  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", () => {
        if (window.scrollY >= 172) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      });
    }
    return window.removeEventListener("scroll", () => {
      if (window.scrollY >= 172) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  }, []);
  return (
    <nav
      className={clsx(
        "h-[54px]   md:z-50 md:top-0 hidden md:flex justify-center items-center    ",
        scrolled
          ? "md:fixed md:left-0 md:right-0 md:top-0 shadow-xl bg-base4 "
          : "md:static  bg-inherit",
      )}
    >
      <ul className="max-w-[1200px]  overflow-hidden  mx-auto gap-5 items-center justify-center flex ">
        {isFetching ? (
          <Skeleton
            className={`w-[500px] ${scrolled ? "bg-slate-100" : "bg-base1"} h-10`}
          />
        ) : pages ? (
          <section
            className={`flex ${scrolled ? "text-base2" : "text-white"}  text-start gap-5 text-xl`}
          >
            <NavList
              locale={params.locale}
              pages={pages.slice(0, navItemNumber)}
            />
            {pages.length > navItemNumber && (
              <HoverMenu
                locale={params.locale}
                pages={pages.slice(navItemNumber, pages.length)}
              />
            )}
          </section>
        ) : (
          <span>Навигация не найдена</span>
        )}
      </ul>
    </nav>
  );
};

const HoverMenu = ({
  pages,
  locale,
}: {
  pages: NavPage[];
  locale: string | string[];
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex outline-none transition-colors hover:bg-base1 rounded-md py-1 px-5   items-end h-full">
          <span className="text-xl">...</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className=" flex flex-col gap-3  text-base2 "
      >
        <div className="flex flex-col gap-3">
          <NavList pages={pages} locale={locale} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const NavList = ({
  pages,
  locale,
}: {
  pages: NavPage[];
  locale: string | string[];
}) => {
  const path = usePathname();
  return pages.map((page) => {
    if (page.children.length === 0 && page.navigation_type == "content") {
      return (
        <Link
          className={clsx(
            "text-center p-1 rounded-md hover:text-white    hover:bg-cyan-800",
            path == `/${locale}${page.slug}` && "font-bold",
          )}
          href={`/${locale}/${page.slug}`}
          key={page.id}
        >
          {page.title}
        </Link>
      );
    } else {
      return (
        <DropdownMenu key={page.id}>
          <DropdownMenuTrigger asChild>
            <div className="p-1 cursor-pointer  rounded-md flex gap-2 items-center text-center hover:text-white  justify-normal hover:bg-base1">
              <span className="ml-5">{page.title}</span>
              <ChevronRight className={clsx("transition rotate-90 mt-1")} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className=" flex flex-col gap-3  text-base2 "
          >
            <NavList locale={locale} pages={page.children} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  });
};
