import {
  Accordion as AccordionUI,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/shared/ui";
import clsx from "clsx";
interface AccordionProps {
  items: AccordionItem[];
}
interface AccordionItem {
  question: string;
  answer: string;
}
function Accordion({ items }: AccordionProps) {
  return (
    <AccordionUI type="single" collapsible>
      {items.map((item, idx) => (
        <AccordionItem
          className="border-b-base2"
          key={idx}
          value={item.question}
        >
          <AccordionTrigger className="text-xl px-2  text-base2">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-lg bg-base6 text-base2 p-2 ">
            <div
              className={clsx(
                "quill-content",
                "overflow-x-auto overflow-y-hidden",
              )}
              dangerouslySetInnerHTML={{
                __html: item.answer
                  .replace(/&lt;/g, "<")
                  .replace(/&gt;/g, ">")
                  .replace(/&amp;nbsp;/g, " "),
              }}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionUI>
  );
}
Accordion.displayName = "Accordion";
export default Accordion;
