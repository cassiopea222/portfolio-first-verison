import Image from "next/image";

import AboutPhotoCarousel from "@/components/AboutPhotoCarousel";
import FooterNote from "@/components/FooterNote";
import SpotifyWidget from "@/components/SpotifyWidget";

const photos = [
  { src: "/about/photo-1.jpg", label: "It's me!", objectPosition: "center bottom" },
  { src: "/about/photo-2.jpg", label: "Looking at art", objectPosition: "center" },
  { src: "/about/photo-3.jpg", label: "Smelling perfumes", objectPosition: "right center" },
  { src: "/about/photo-4.jpg", label: "Listening to music", objectPosition: "center top" },
] as const;

type PhotoProps = {
  src: string;
  label: string;
  objectPosition?: string;
};

function Photo({ src, label, objectPosition = "center" }: PhotoProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-3">
      <div
        data-tooltip={label}
        className="relative aspect-[237/340] w-full overflow-hidden rounded-[12px]"
      >
        <Image
          src={src}
          alt={label}
          fill
          sizes="(max-width: 809px) 25vw, 25vw"
          className="h-full w-full object-cover"
          style={{ objectPosition }}
        />
      </div>
      <p className="whitespace-nowrap text-[14px] font-medium leading-[18px] text-[var(--text-tertiary)] min-[810px]:hidden">
        {label}
      </p>
    </div>
  );
}

export default function About() {
  return (
    <>
      <section className="mx-auto flex w-full max-w-[900px] flex-col fluid-px pt-[100px] pb-[60px]">
        <div className="flex w-full flex-col gap-[60px]">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-[20px]">
                <h1
                  className="font-medium text-[var(--text-primary)]"
                  style={{ fontFamily: "var(--font-crimson)", fontSize: 32, lineHeight: "38px" }}
                >
                  Hi there! I&apos;m Julia
                </h1>
                <div className="flex flex-col gap-4 font-sans text-[16px] font-normal leading-[24px] tracking-[0.2px] text-[var(--text-secondary)]">
                  <p>
                    Originally from Ukraine, I was curious about design and
                    technologies from my childhood - my first website came at 10,
                    built with whatever tools I could find.
                  </p>
                  <p>
                    What I love about this work is observing how people interact
                    with interfaces. There&apos;s something fascinating about what
                    makes an interaction feel intuitive, and I love being the
                    person who gets to shape that.
                  </p>
                  <p>
                    Outside the work I draw, explore niche perfumes and do yoga.
                  </p>
                </div>
              </div>

              {/* Photos — carousel below 810px, row above */}
              <div className="w-full">
                <div className="min-[810px]:hidden w-full">
                  <AboutPhotoCarousel photos={[...photos]} />
                </div>
                <div className="hidden min-[810px]:flex w-full gap-3">
                  {photos.map((photo) => (
                    <Photo
                      key={photo.label}
                      src={photo.src}
                      label={photo.label}
                      objectPosition={photo.objectPosition}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[20px]">
              <h2
                className="font-medium text-[var(--text-primary)]"
                style={{ fontSize: 24, lineHeight: "32px" }}
              >
                Experience
              </h2>

              <div className="flex flex-col gap-5">
                <div className="flex w-full items-center justify-between gap-4 max-[809px]:flex-col max-[809px]:items-start max-[809px]:gap-1">
                  <p className="text-[20px] font-medium leading-7 text-[var(--text-primary)]">
                    Product designer at Fireart
                  </p>
                  <p className="whitespace-nowrap text-[16px] font-normal leading-6 text-[var(--text-tertiary)]">
                    July 2022 - Present
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex w-full items-center justify-between gap-4 max-[809px]:flex-col max-[809px]:items-start max-[809px]:gap-1">
                    <p className="text-[16px] font-medium leading-6 text-[var(--text-primary)]">
                      Governmental Platform (NDA)
                    </p>
                    <p className="whitespace-nowrap text-[16px] font-normal leading-6 text-[var(--text-tertiary)]">
                      January 2025 - June 2026
                    </p>
                  </div>
                  <ul className="flex list-disc flex-col gap-[10px] pl-6 font-sans text-[16px] font-normal leading-6 tracking-[0.2px] text-[var(--text-secondary)]">
                    <li>
                      Worked on a government digital platform consisting of dashboard, CMS and an admin panel; owned and led the design of multiple core flows.
                    </li>
                    <li>
                      Created the visual style foundation for the product&apos;s design system: designed the color system and typography, and translated them into reusable tokens and guidelines.
                    </li>
                    <li>
                      Built and maintained a design system: structured the component library, ensured consistency across screens, and supported documentation for scalable use.
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex w-full items-center justify-between gap-4 max-[809px]:flex-col max-[809px]:items-start max-[809px]:gap-1">
                    <p className="text-[16px] font-medium leading-6 text-[var(--text-primary)]">
                      Cortwo (cybersecurity startup)
                    </p>
                    <p className="whitespace-nowrap text-[16px] font-normal leading-6 text-[var(--text-tertiary)]">
                      November 2024 - January 2025
                    </p>
                  </div>
                  <ul className="flex list-disc flex-col gap-[10px] pl-6 font-sans text-[16px] font-normal leading-6 tracking-[0.2px] text-[var(--text-secondary)]">
                    <li>
                      Designed early product concepts for a cybersecurity startup (B2B/B2C): explored key user journeys and interaction patterns for secure online communication/access.
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex w-full items-center justify-between gap-4 max-[809px]:flex-col max-[809px]:items-start max-[809px]:gap-1">
                    <p className="text-[16px] font-medium leading-6 text-[var(--text-primary)]">
                      Sadie Active
                    </p>
                    <p className="whitespace-nowrap text-[16px] font-normal leading-6 text-[var(--text-tertiary)]">
                      October 2023 - February 2024
                    </p>
                  </div>
                  <ul className="flex list-disc flex-col gap-[10px] pl-6 font-sans text-[16px] font-normal leading-6 tracking-[0.2px] text-[var(--text-secondary)]">
                    <li>
                      Collaborated on a mobile fitness app redesign for a creator brand, improving workout programs, training, and nutrition flows; supported research insights and usability improvements.
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-3">
                  <p className="text-[16px] font-medium leading-6 text-[var(--text-primary)]">
                    Other
                  </p>
                  <ul className="flex list-disc flex-col gap-[10px] pl-6 font-sans text-[16px] font-normal leading-6 tracking-[0.2px] text-[var(--text-secondary)]">
                    <li>
                      Contributed to a large-scale social media platform (~400K daily users), designing features and maintaining shared design system patterns across teams/platforms.
                    </li>
                    <li>
                      Designed a marketing website for a 3PL logistics company: packaged service offerings and value proposition into a clear site structure (information architecture, page layouts, key sections, and conversion paths).
                    </li>
                  </ul>
                </div>
              </div>
            </div>
        </div>

        {/* Widgets */}
        <div className="mt-[60px] grid w-full grid-cols-1 gap-4 min-[810px]:grid-cols-2">
            <SpotifyWidget className="min-w-0" />

            <article
              data-tooltip="Currently building"
              className="flex min-w-0 flex-col justify-between overflow-hidden rounded-[12px] border border-[#cecece] bg-gradient-to-b from-white to-[#d4d4d4] to-[182.4%] px-3 py-2 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.08)]"
            >
              <div className="flex flex-col gap-[2px]">
                <div className="type-mono flex items-center justify-between">
                  <p className="text-[16px] font-medium leading-6 text-[var(--text-primary)]">
                    Tbilisi, Georgia
                  </p>
                  <p className="text-[20px] font-medium leading-7 tracking-[0.4px] text-[var(--text-primary)]">
                    5°C
                  </p>
                </div>
                <p className="type-mono text-[14px] font-medium leading-5 tracking-[-0.14px] text-[var(--text-tertiary)]">
                  Partly Cloudy · Feels like 3°
                </p>
              </div>
              <div className="type-mono flex items-center justify-between">
                <p className="text-[16px] font-medium leading-6 text-[var(--text-primary)]">
                  12:30 AM
                </p>
                <p className="text-[14px] font-medium leading-5 text-[var(--text-tertiary)]">
                  -4 hrs CET
                </p>
              </div>
            </article>
        </div>
      </section>
      <FooterNote />
    </>
  );
}
