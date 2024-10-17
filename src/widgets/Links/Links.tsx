interface LinksProps {
  title: string;
  items: { name: string; link: string }[];
}
function Links({ title, items }: LinksProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl text-base2 font-bold">{title}</h2>
      <ul className="transition-colors duration-150 flex flex-col gap-3 ">
        {items.map((li, idx) => (
          <li
            key={idx}
            className="hover:text-base4 text-xl underline hover:underline-offset-2 hover:decoration-base4 "
          >
            <a href={li.link} target="_blank">
              {li.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
Links.displayName = "Links";

export default Links;
