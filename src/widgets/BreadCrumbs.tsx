import { NavPage } from "@/shared/lib/types";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/ui";
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
      <BreadcrumbList>
        {crumbs.map((crumb, idx) => (
          <BreadcrumbItem className="text-cyan-500 font-bold text-xl" key={idx}>
            <BreadcrumbLink
              href={
                crumb.type == "content" ? `/${locale}${crumb.slug}` : undefined
              }
            >
              {crumb.title}
            </BreadcrumbLink>
            {idx < crumbs.length - 1 && (
              <ChevronRight size={30} className="mb-1" />
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
