import clsx from "clsx";

interface TextProps {
  heading: string;
  content: string;
}
function Text({ heading, content }: TextProps) {
  let c;
  return (
    <section className="p-4 ">
      <h2 className="text-3xl mb-2 ">{heading}</h2>
      <div
        className={clsx("quill-content", "overflow-x-auto overflow-y-hidden")}
        dangerouslySetInnerHTML={{
          __html: content
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&amp;nbsp;/g, " "),
        }}
      />
    </section>
  );
}
Text.displayName = "Text";
export default Text;
