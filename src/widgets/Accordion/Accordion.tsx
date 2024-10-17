import {
  Accordion as AccordionUI,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/shared/ui";
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
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionUI>
  );
}
Accordion.displayName = "Accordion";
export default Accordion;
