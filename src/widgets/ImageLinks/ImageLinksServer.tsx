import { ImageLinksClient, LinksProps } from "@/widgets/ImageLinks/ImageLinks";
function ImageLinks(props: LinksProps) {
  return <ImageLinksClient {...props} />;
}

ImageLinks.displayName = "ImageLinks";

export default ImageLinks;
