import Accordion from "./Accordion/Accordion";
export { VisitBarChart } from "./VisitBarChart";
import AccordionEditModal from "./Accordion/AccordionEditModal";
import Cards from "./Cards/CardsServer";
import CardsEditModal from "./Cards/CardsEditModal";
import Carousel from "./Carousel/CarouselServer";
import CarouselEditModal from "./Carousel/CarouselEditModal";
import Gallery from "./Gallery/GalleryServer";
import GalleryEditModal from "./Gallery/GalleryEditModal";
import Info from "./Info/Info";
import InfoEditModal from "./Info/InfoEditModal";
import Links from "./Links/Links";
import ImageLinks from "./ImageLinks/ImageLinksServer";
import LinksEditModal from "@/widgets/Links/LinksEditModal";
import ImageLinksEditModal from "@/widgets/ImageLinks/ImageLinksEditModal";
import List from "./List/ListServer";
import ListEditModal from "./List/ListEditModal";
import Text from "./Text/Text";
import TextEditModal from "./Text/TextEditModal";

export { AdminSidebar } from "./AdminSidebar/AdminSidebar";
export { BreadCrumbs } from "./BreadCrumbs";
export { BurgerMenu } from "./BurgerMenu/BurgetMenu";
export { Header } from "./Header/Header";
export { PagesListTable } from "./PagesListTable/PagesListTable";
export { TemplatesListTable } from "./TemplatesListTable/TemplateListTable";
export {
  Accordion,
  AccordionEditModal,
  Cards,
  CardsEditModal,
  Carousel,
  CarouselEditModal,
  Gallery,
  GalleryEditModal,
  Info,
  InfoEditModal,
  Links,
  LinksEditModal,
  List,
  ListEditModal,
  Text,
  TextEditModal,
};
export const editModalList = [
  CardsEditModal,
  CarouselEditModal,
  ListEditModal,
  TextEditModal,
  LinksEditModal,
  ImageLinksEditModal,
  InfoEditModal,
  AccordionEditModal,
  GalleryEditModal,
];
export const widgetsList = [
  Cards,
  Carousel,
  List,
  Text,
  Links,
  ImageLinks,
  Info,
  Accordion,
  Gallery,
];
export const ruWidgetsList = {
  Cards: "Карточки",
  Carousel: "Карусель",
  List: "Список документов",
  Text: "Текстовый виджет",
  Links: "Cсылки",
  ImageLinks: "Ссылки-картинки",
  Info: "Инфо-виджет",
  Accordion: "Аккордеон",
  Gallery: "Галлерея",
};
export const getWidgetByName = (name: string, props: any) => {
  const widget = widgetsList.find((w, idx) => {
    return w.displayName == name;
  });

  if (widget) {
    return widget({ ...props });
  }
  return null;
};
export const getEditModal = (
  modal: string,
  order: number,
  ruPageId: string | null,
  kzPageId: string | null,
  queryKey: string,
  template?: boolean,
) => {
  if (ruPageId && kzPageId) {
    const baseProps = {
      order,
      ruPageId: +ruPageId,
      kzPageId: +kzPageId,
      queryKey,
    };
    const editModal = editModalList.find((m) => m.displayName.includes(modal));
    if (editModal) {
      const variant = template ? "dialog" : "card";
      return editModal({ variant, ...baseProps });
    }
    return null;
  }
};
