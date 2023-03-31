import { Carousel } from "flowbite-react";
import Image from "next/image";
const ImageCarousel = () => {
  return (
    <section>
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel slideInterval={2000}>
          <Image
            width={1608}
            height={1080}
            src="/osteopatia-fizjoterapia-torun.png"
            alt="Usługi Osteopatii i Fizjoterapii w Toruniu"
            title="Usługi Osteopatii i Fizjoterapii w Toruniu"
            loading="lazy"
          />
          <Image
            width={1608}
            height={1080}
            src="/osteopatia-fizjoterapia-torun.png"
            alt="Usługi Osteopatii i Fizjoterapii w Toruniu"
            title="Usługi Osteopatii i Fizjoterapii w Toruniu"
            loading="lazy"
          />
          <Image
            width={1608}
            height={1080}
            src="/osteopatia-fizjoterapia-torun.png"
            alt="Usługi Osteopatii i Fizjoterapii w Toruniu"
            title="Usługi Osteopatii i Fizjoterapii w Toruniu"
            loading="lazy"
          />
          <Image
            width={1608}
            height={1080}
            src="/osteopatia-fizjoterapia-torun.png"
            alt="Usługi Osteopatii i Fizjoterapii w Toruniu"
            title="Usługi Osteopatii i Fizjoterapii w Toruniu"
            loading="lazy"
          />
        </Carousel>
      </div>
    </section>
  );
};

export default ImageCarousel;
