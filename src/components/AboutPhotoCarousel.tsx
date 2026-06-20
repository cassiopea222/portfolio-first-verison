"use client";

import Image from "next/image";

export type AboutPhoto = {
  src: string;
  label: string;
  objectPosition?: string;
};

type AboutPhotoCarouselProps = {
  photos: AboutPhoto[];
};

export default function AboutPhotoCarousel({ photos }: AboutPhotoCarouselProps) {
  return (
    <div
      className="flex w-full gap-3 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label="Photo gallery"
    >
      {photos.map((photo) => (
        <div
          key={photo.label}
          className="flex w-[201px] shrink-0 flex-col items-center gap-3"
        >
          <div
            data-tooltip={photo.label}
            className="relative aspect-[237/340] w-[201px] overflow-hidden rounded-[12px]"
          >
            <Image
              src={photo.src}
              alt={photo.label}
              fill
              sizes="201px"
              className="h-full w-full object-cover"
              style={{ objectPosition: photo.objectPosition ?? "center" }}
            />
          </div>
          <p className="whitespace-nowrap text-[14px] font-medium leading-[18px] text-[var(--text-tertiary)]">
            {photo.label}
          </p>
        </div>
      ))}
    </div>
  );
}
