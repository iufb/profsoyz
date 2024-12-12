import CardsClient, { CardsProps } from "@/widgets/Cards/Cards";
function Cards(props: CardsProps) {
  return <CardsClient {...props} />;
}

Cards.displayName = "Cards";

export default Cards;
