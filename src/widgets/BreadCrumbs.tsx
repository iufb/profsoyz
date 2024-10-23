import { NavPage } from "@/shared/lib/types";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/ui";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
function getBreadCrumbs(slug: string[], pages: NavPage[]) {
  const res: { title: string; slug: string; type: string }[] = [];
  const slugLength = slug.length;
  const search = (pages: NavPage[], start: number) => {
    pages.map((page) => {
      for (let i = start; i < slugLength; i++) {
        const slugEnd = i == 0 ? slug[i] : `${slug[i - 1]}/${slug[i]}`;
        if (page.slug.endsWith(slugEnd)) {
          res.push({
            title: page.title,
            slug: page.slug,
            type: page.navigation_type,
          });
        }
        if (page.children.length > 0) {
          search(page.children, i + 1);
        }
      }
    });
  };
  search(pages, 0);
  return res;
}
export const BreadCrumbs = ({
  slug,
  locale,
  pages,
}: {
  slug: string[];
  locale: string;
  pages: NavPage[];
}) => {
  const crumbs = getBreadCrumbs(slug, pages);
  return (
    <Breadcrumb className={`${slug[0] == "home" && "hidden"}`}>
      <BreadcrumbList className="max-w-[90vw] flex-nowrap overflow-x-auto">
        {crumbs.map((crumb, idx) => (
          <BreadcrumbItem
            className="text-base4  font-bold text-sm md:text-xl"
            key={idx}
          >
            <BreadcrumbLink
              className={clsx(crumb.type == "content" && "hover:text-base6")}
              href={
                crumb.type == "content" ? `/${locale}${crumb.slug}` : undefined
              }
            >
              {crumb.title}
            </BreadcrumbLink>
            {idx < crumbs.length - 1 && <ChevronRight size={30} className="" />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
