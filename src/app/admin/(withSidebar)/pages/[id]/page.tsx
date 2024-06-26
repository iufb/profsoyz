import { PageDialog } from "@/features";
import { PagesListTable } from "@/widgets";
import { mockPages } from "../page";

export default function Page({ params }: { params: { id: number } }) {
  return (
    <section>
      <section className="flex gap-4">
        <PageDialog withContent={false} variant="create" parentId={params.id} />
      </section>
      <h2 className="text-center text-xl font-bold">Дочерние страницы</h2>
      <PagesListTable
        pages={mockPages.slice(1, 5).map((page) => ({
          ...page,
          slug: `/lvl2/${page.id}`,
        }))}
      />
    </section>
  );
}
