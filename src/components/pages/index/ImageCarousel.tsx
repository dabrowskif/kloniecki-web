import { Carousel } from "flowbite-react";
import Image from "next/image";
const ImageCarousel = () => {
  return (
    <section>
      <div id="default-carousel" className="relative w-full" data-carousel="slide">
        <div className="relative h-56 overflow-hidden md:h-96">
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <Image
              width={1608}
              height={1080}
              className="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
              src="/osteopatia-fizjoterapia-torun.png"
              alt="Usługi Osteopatii i Fizjoterapii w Toruniu"
              title="Usługi Osteopatii i Fizjoterapii w Toruniu"
              loading="lazy"
            />
          </div>
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <Image
              width={1608}
              height={1080}
              className="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
              src="/osteopatia-fizjoterapia-torun.png"
              alt="Usługi Osteopatii i Fizjoterapii w Toruniu"
              title="Usługi Osteopatii i Fizjoterapii w Toruniu"
              loading="lazy"
            />
          </div>
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <Image
              width={1608}
              height={1080}
              className="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
              src="/osteopatia-fizjoterapia-torun.png"
              alt="Usługi Osteopatii i Fizjoterapii w Toruniu"
              title="Usługi Osteopatii i Fizjoterapii w Toruniu"
              loading="lazy"
            />
          </div>
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <Image
              width={1608}
              height={1080}
              className="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
              src="/osteopatia-fizjoterapia-torun.png"
              alt="Usługi Osteopatii i Fizjoterapii w Toruniu"
              title="Usługi Osteopatii i Fizjoterapii w Toruniu"
              loading="lazy"
            />
          </div>
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <Image
              width={1608}
              height={1080}
              className="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
              src="/osteopatia-fizjoterapia-torun.png"
              alt="Usługi Osteopatii i Fizjoterapii w Toruniu"
              title="Usługi Osteopatii i Fizjoterapii w Toruniu"
              loading="lazy"
            />
          </div>
        </div>
        <button
          type="button"
          className="group absolute left-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
          data-carousel-prev
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10">
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="group absolute right-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
          data-carousel-next
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10">
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </section>
  );
};

export default ImageCarousel;
