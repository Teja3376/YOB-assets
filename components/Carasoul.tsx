import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Autoplay from "embla-carousel-autoplay";

const Carasoul = ({ gallery }: { gallery: string[] }) => {
  return (
    <Carousel
      className="w-full  relative"
      plugins={[Autoplay({ delay: 2000 })]}
    >
      <CarouselContent>
        {gallery?.map((img: string, index: number) => (
          <CarouselItem key={index}>
            <Card className="overflow-hidden  border-0 shadow-none rounded-none">
              <CardContent className="p-0 relative">
                <img
                  src={img}
                  alt={`property-${index}`}
                  className="w-full h-70 object-cover rounded-md"
                />
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white shadow rounded-full" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white shadow rounded-full" />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Carasoul;
