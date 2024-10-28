import { BaseEditModalProps } from "@/shared/lib/types";
import { EditModal } from "@/widgets/EditModal/EditModal";
const mainKeys = ["variant", "titleRu", "titleKz"];
const mainInputs = [
  { label: "Заголовок RU", value: "text" },
  { label: "Заголовок KZ", value: "text" },
];

const itemKeys = ["nameRu", "nameKz", "linkRu", "linkKz", "image"];
const itemInputs = [
  { label: "Название RU", value: "text" },
  { label: "Название KZ", value: "text" },
  { label: "Ccылка RU", value: "text" },
  { label: "Ccылка KZ", value: "text" },
  { value: "file" },
];

function ImageLinksEditModal(props: BaseEditModalProps) {
  const modalProps = {
    ...props,
    widgetName: "ImageLinks",
    mainKeys,
    mainInputs,
    itemKeys,
    itemInputs,
    withTemplate: false,
  };
  return <EditModal {...modalProps} />;
}
ImageLinksEditModal.displayName = "ImageLinksEditModal";
export default ImageLinksEditModal;
