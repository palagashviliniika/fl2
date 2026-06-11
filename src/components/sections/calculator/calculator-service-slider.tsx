"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperClass } from "swiper/react";
import type { ServiceCalculatorItem } from "@/shared/types/service";
import "swiper/css";

type CalculatorServiceSliderProps = {
  services: ServiceCalculatorItem[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
};

export function CalculatorServiceSlider({
  services,
  selectedSlug,
  onSelect,
}: CalculatorServiceSliderProps) {
  const t = useTranslations("calculator");
  const swiperRef = useRef<SwiperClass | null>(null);

  function handleSelect(slug: string, index: number) {
    onSelect(slug);
    swiperRef.current?.slideTo(index);
  }

  return (
    <div className="mt-12">
      <p className="text-base font-bold uppercase tracking-wide text-text lg:text-2xl">
        {t("selectService")}
      </p>

      <div className="mt-5">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView="auto"
          spaceBetween={19}
        >
          {services.map((service, index) => {
            const isSelected = service.slug === selectedSlug;

            return (
              <SwiperSlide key={service.slug} style={{ width: 256 }}>
                <button
                  type="button"
                  onClick={() => handleSelect(service.slug, index)}
                  aria-pressed={isSelected}
                  className="group relative flex h-[260px] w-[256px] cursor-pointer flex-col overflow-hidden rounded-[40px] border border-brown/50 bg-light transition-all duration-200"
                >
                  <div className="relative flex-1 overflow-hidden">
                    {service.featuredImage && (
                      <Image
                        src={service.featuredImage}
                        alt={service.name}
                        fill
                        className="object-cover"
                        sizes="256px"
                      />
                    )}
                    <div
                      className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ease-in-out ${
                        isSelected ? "opacity-0" : "opacity-100"
                      }`}
                      aria-hidden="true"
                    />
                    <AnimatePresence>
                      {isSelected && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="absolute top-4 right-4 z-10 flex size-8 items-center justify-center rounded-full bg-gold"
                        >
                          <Check
                            className="size-4 stroke-[2.5] text-text"
                            aria-hidden="true"
                          />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <div
                    className={`text-start shrink-0 px-4 pb-[18px] pt-2 transition-colors duration-300 ease-in-out ${
                      isSelected
                        ? "bg-brown text-light"
                        : "bg-light text-text group-hover:bg-brown group-hover:text-light"
                    }`}
                  >
                    <p className="text-sm font-bold leading-snug">
                      {service.name}
                    </p>
                    <p className="text-sm">
                      {service.pricePerSqm}
                      {t("currency")}/{t("sqmAbbrev")}
                    </p>
                  </div>
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
