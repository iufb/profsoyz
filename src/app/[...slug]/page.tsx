import { Carousel, Text } from "@/widgets";

// const getPageContent = async (slug: any) => {
//   const { data } = await fetch("/hello");
//   return data;
// };
const mockCarouselItems = new Array(9).fill({
  img: "/123.jpg",
  title: "Title",
  href: `/party/${Math.ceil(Math.random() * 100)}`,
  content:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
});

const mock = [
  {
    name: "Text",
    props: {
      heading: "Hello World",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
    },
  },
  {
    name: "Carousel",
    props: {
      items: mockCarouselItems,
      position: "left",
    },
  },
];
export default async function Page({ params }: { params: any }) {
  console.log(params);
  // const data = await getPageContent(params.slug);
  return (
    <section className="p-10">
      {mock.map((m) => getWidgetByName(m.name, m.props))}
    </section>
  );
}

const getWidgetByName = (name: string, props: any) => {
  switch (name) {
    case "Carousel":
      return <Carousel {...props} />;
    case "Text":
      return <Text {...props} />;
    default:
      return <></>;
  }
};
