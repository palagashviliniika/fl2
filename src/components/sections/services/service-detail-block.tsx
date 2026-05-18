"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { SwiperClass } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import "swiper/css";

type ServiceDetailDirection = "left" | "right";

type ServiceDetailBlockProps = {
  title?: string;
  description: string;
  images?: string[];
  direction?: ServiceDetailDirection;
};

export const ServiceDetailBlock = ({
  title,
  description,
  images = [],
  direction = "left",
}: ServiceDetailBlockProps) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const hasImages = images.length > 0;
  const hasMultiple = images.length > 1;
  const imageAlt = title ?? "Service";

  return (
    <section className="bg-light">
      <div
        className={cn(
          "mx-auto flex max-w-[1440px] flex-col gap-10 px-6 lg:gap-6 lg:px-20",
          hasImages && "justify-between lg:items-center",
          hasImages &&
            (direction === "right" ? "lg:flex-row-reverse" : "lg:flex-row"),
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-10 lg:gap-12",
            hasImages ? "flex-1 lg:max-w-[580px]" : "w-full",
          )}
        >
          {title ? (
            <h2 className="text-xl font-bold uppercase tracking-wide text-text lg:text-[32px] lg:leading-tight">
              {title}
            </h2>
          ) : null}
          <p className="whitespace-pre-line text-base leading-snug text-text lg:text-xl lg:leading-snug lg:text-justify">
            {description}
          </p>
        </div>

        {hasImages ? (
          <div className="relative w-full shrink-0 lg:w-[630px]">
            {hasMultiple ? (
              <div className={"relative w-full overflow-hidden rounded-[20px] shadow-[0_4px_15px_rgba(0,0,0,0.2)] aspect-[630/447] lg:h-[447px] lg:max-h-[447px] lg:aspect-auto"}>
                <Swiper
                  modules={[Autoplay]}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  slidesPerView={1}
                  loop
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  className="!h-full !w-full"
                >
                  {images.map((src, index) => (
                    <SwiperSlide key={`${src}-${index}`}>
                      <div className="relative h-full min-h-[280px] w-full lg:min-h-[447px]">
                        <Image
                          src={src}
                          alt={imageAlt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1023px) 100vw, 630px"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-5">
                  <button
                    type="button"
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="pointer-events-auto flex cursor-pointer items-center justify-center text-white transition-opacity hover:opacity-80"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="size-7" strokeWidth={2} />
                  </button>
                  <button
                    type="button"
                    onClick={() => swiperRef.current?.slideNext()}
                    className="pointer-events-auto flex cursor-pointer items-center justify-center text-white transition-opacity hover:opacity-80"
                    aria-label="Next image"
                  >
                    <ChevronRight className="size-7" strokeWidth={2} />
                  </button>
                </div>
              </div>
            ) : (
              <div className={"relative w-full overflow-hidden rounded-[20px] shadow-[0_4px_15px_rgba(0,0,0,0.2)] aspect-[630/447] lg:h-[447px] lg:max-h-[447px] lg:aspect-auto"}>
                <Image
                  src={images[0]}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1023px) 100vw, 630px"
                  priority
                />
              </div>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
};
