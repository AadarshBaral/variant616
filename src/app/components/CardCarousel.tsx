import { data } from "@/utils/textData";
import { Card, Carousel } from "./AppleCardsCarousel";

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));
  return (
    <div className="w-full py-10">
      <Carousel items={cards} />
    </div>
  );
}
