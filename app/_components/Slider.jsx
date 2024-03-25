import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import NextImage from "next/image"; // Correct import

const Slider = ({ SliderList }) => {
  return (
    <Carousel>
      <CarouselContent>
        {SliderList.map((slider, index) => (
          <CarouselItem key={index}>
            <NextImage
              src={slider.attributes?.image?.data[0]?.attributes?.url}
              alt="sliderimage"
              width={1000}
              height={500}
              className="w-full md:h-[400px] object-cover rounded-2xl h-[200px]"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Slider;
