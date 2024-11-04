import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui";
import { getWidgetByName } from "@/widgets";
import { Image as ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";
interface PreviewButtonProps {
  modal: string;
}

const mockProps = {
  Info: {
    options:
      '{"title":"We prepare today’s learners for tomorrow’s world of work","content":"Our mission is to provide people with access to digitally-enhanced capacity development services to successfully manage their future of work transitions. From our sustainability-minded courses to our SDG-informed Masters, we always put our participants first.","items":[{"title":"Hundreds of courses","content":"The Centre leverages global alliances and partnerships to deliver training activities.  Courses cover topics like employment promotion, international labour standards, social protection, social dialogue, innovation, gender equality and diversity, sustainable development, and the future of work.  We offer academies, standard courses, free self-paced courses, and Masters. You can also search by topic, language, and mode (online, face-to-face, or blended).","image":"uploads/preview.jpeg","imagePosition":"right","linkText":"See more"}]}',
  },
  Links: {
    options:
      '{"title":"Нормативные правовые акты","items":[{"name":"Трудовой кодекс Республики Казахстан","link":"https://adilet.zan.kz/rus/docs/K1500000414","image":"","href":"/template-1721815109111","templateId":"574*575","templateName":null},{"name":"Закон РК \\"О профессиональных союзах\\"","link":"https://adilet.zan.kz/rus/docs/Z1400000211","image":"","href":"/template-1721815182890","templateId":"576*577","templateName":null}]}',
  },
  Cards: {
    options:
      '{"variant":"base","title":"123","items":[{"title":"123","content":"1test223","image":"uploads/preview.jpeg"},{"title":"123","content":"123","image":"uploads/preview.jpeg"}]}',
  },
  Carousel: {
    options:
      '{"items":[{"content":"Заголовок","image":"uploads/preview.jpeg"}]}',
  },
  Text: {
    options:
      '{"heading":"Заголовок","content":"<p>Контент</p>","items":[],"language_key":"ru","navigation_id":635}',
  },
  Accordion: {
    options: '{"items":[{"question":"Вопрос","answer":"ответ"}]}',
  },
  List: {
    options:
      '{"items":[{"content":"Контент","file":"uploads/preview.jpeg","href":"","templateId":"1722251456243"},{"content":"Контент","file":"uploads/preview.jpeg","href":"","templateId":"1722251686088"}]}',
  },
  Gallery: {
    options:
      '{"items":[{"image":"uploads/preview.jpeg","href":"","templateId":"1722335477257"},{"image":"uploads/preview.jpeg","href":"","templateId":"1722335515681"},{"image":"uploads/preview.jpeg","href":"","templateId":"1722336769691"},{"image":"uploads/preview.jpeg","href":"","templateId":"1722337591559"},{"image":"uploads/preview.jpeg","href":"","templateId":"1722338200944"},{"image":"uploads/preview.jpeg","href":"","templateId":"1722338252393"},{"image":"uploads/preview.jpeg","href":"","templateId":"1722338256197"}]}',
  },
  ImageLinks: {
    options:
      '{"variant":"Полезные ссылки","title":"Полезные ссылки","items":[{"name":"123","link":"https://youtube.com","image":"uploads/preview.jpeg","href":"","templateId":"1729759966319"},{"name":"222","link":"https://google.com","image":"uploads/preview.jpeg","href":"","templateId":"1729760982134"},{"name":"55","link":"https://yandex.ru","image":"uploads/preview.jpeg","href":"","templateId":"1729761011459"},{"name":"12","link":"123","image":"uploads/preview.jpeg","href":"","templateId":"1729765580460"}]}',
  },
};

export const PreviewButton = ({ modal }: PreviewButtonProps) => {
  const t = useTranslations("pages.pageEditorContent");
  return (
    <Dialog>
      <DialogTrigger className="bg-black rounded-md px-3">
        <ImageIcon color="white" />
      </DialogTrigger>
      <DialogContent className="h-[calc(100svh-200px)] min-w-[calc(100vw-100px)]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {t("preview.title")} {modal}
          </DialogTitle>
          <DialogDescription className="">
            {t("preview.desc")}
          </DialogDescription>
        </DialogHeader>
        <div className="max-w-[1200px] w-full mx-auto">
          {getWidgetByName(
            modal,
            JSON.parse(mockProps[modal as keyof typeof mockProps].options),
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
