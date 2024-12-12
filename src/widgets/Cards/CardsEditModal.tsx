import { BaseEditModalProps } from "@/shared/lib/types";
import { EditModal } from "@/widgets/EditModal/EditModal";
const mainKeys = ["titleRu", "titleKz", "variant"];
const mainInputs = [
  { label: "Заголовок RU", value: "text" },
  { label: "Заголовок KZ", value: "text" },
  {
    value: "select",
    select: {
      placeholder: "Вид карточек ",
      values: [
        { value: "base", label: "Стандартный" },
        { value: "horizontal", label: "Горизонтальный" },
      ],
    },
  },
];

const itemKeys = ["titleRu", "titleKz", "contentRu", "contentKz", "image"];
const itemInputs = [
  { label: "Заголовок RU", value: "text" },
  { label: "Заголовок KZ", value: "text" },
  { label: "Контент RU", value: "quill" },
  { label: "Контент KZ", value: "quill" },
  { value: "file" },
];

function CardsEditModal(props: BaseEditModalProps) {
  const modalProps = {
    ...props,
    widgetName: "Cards",
    mainKeys,
    mainInputs,
    itemKeys,
    itemInputs,
    withTemplate: true,
  };
  return <EditModal {...modalProps} />;
}
CardsEditModal.displayName = "CardsEditModal";
export default CardsEditModal;
