import Image from "next/image";

// Photos
const imgPhoto1 = "/about/photo-1.jpg";
const imgPhoto2 = "/about/photo-2.jpg";
const imgPhoto3 = "/about/photo-3.jpg";
const imgPhoto4 = "/about/photo-4.jpg";
const imgAlbum = "/about/album.jpg";

type PhotoProps = {
  src: string;
  label: string;
  objectPosition?: string;
};

function Photo({ src, label, objectPosition = "center" }: PhotoProps) {
  return (
    <div
      data-tooltip={label}
      className="relative h-[260px] w-[201px] shrink-0 overflow-hidden rounded-[12px]"
    >
      <Image
        src={src}
        alt={label}
        fill
        sizes="201px"
        className="object-cover"
        style={{ objectPosition }}
      />
    </div>
  );
}

export default function About() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col items-center">
      <div className="flex w-full flex-col gap-[100px]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center fluid-px">
          <div className="flex w-full max-w-[840px] flex-col gap-[60px] pt-[100px]">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-[20px]">
                <h1 className="text-[26px] font-medium leading-9 text-[var(--text-primary)]">
                  Hi there! I&apos;m Julia.
                </h1>
                <div className="flex flex-col gap-4 text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
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

              {/* Photos row */}
              <div className="flex w-full gap-3 overflow-x-auto">
                <Photo src={imgPhoto1} label="It's me!" objectPosition="center bottom" />
                <Photo src={imgPhoto2} label="Looking at art" objectPosition="center" />
                <Photo src={imgPhoto3} label="Smelling perfumes" objectPosition="right center" />
                <Photo src={imgPhoto4} label="Listening to music" objectPosition="center top" />
              </div>
            </div>

            <div className="flex flex-col gap-[20px]">
              <h2 className="text-[24px] font-medium leading-9 text-[var(--text-primary)]">
                Experience
              </h2>

              <div className="flex flex-col gap-5">
                <div className="flex w-full items-start justify-between gap-4">
                  <p className="text-[20px] font-medium leading-7 text-[var(--text-primary)]">
                    Product designer at Fireart
                  </p>
                  <p className="whitespace-nowrap text-[18px] font-normal leading-6 text-[var(--text-tertiary)]">
                    July 2022 - Present
                  </p>
                </div>

                <ul className="flex list-disc flex-col gap-[10px] pl-6 text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
                  <li>
                    Worked on a government digital platform (under NDA) consisting
                    of a CMS and an admin dashboard; owned and led the design of
                    multiple core flows.
                  </li>
                  <li>
                    Created the visual style foundation for the product&apos;s
                    design system: designed the color system and typography, and
                    translated them into reusable tokens and guidelines.
                  </li>
                  <li>
                    Built and maintained a design system: structured the component
                    library, ensured consistency across screens, and supported
                    documentation for scalable use.
                  </li>
                  <li>
                    Collaborated on a mobile fitness app redesign for a creator
                    brand, improving workout programs, training, and nutrition
                    flows; supported research insights and usability improvements.
                  </li>
                  <li>
                    Designed early product concepts for a cybersecurity startup
                    (B2B/B2C): explored key user journeys and interaction patterns
                    for secure online communication/access.
                  </li>
                  <li>
                    Contributed to a large-scale social media platform (~400K
                    daily users), designing features and maintaining shared design
                    system patterns across teams/platforms.
                  </li>
                  <li>
                    Designed a marketing website for a 3PL logistics company:
                    packaged service offerings and value proposition into a clear
                    site structure (information architecture, page layouts, key
                    sections, and conversion paths).
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Widgets */}
          <div className="mt-[60px] grid w-full max-w-[780px] grid-cols-1 gap-4 lg:grid-cols-2">
            <article className="flex flex-col gap-[6px] overflow-hidden rounded-[12px] border border-[#cecece] bg-gradient-to-b from-white to-[#d4d4d4] to-[182.4%] px-3 py-2 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.08)]">
              <div className="type-mono flex items-start justify-between text-[14px] font-normal leading-5 text-[var(--text-tertiary)]">
                <p>Last listened to</p>
                <p>20 mins ago</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative h-[66px] w-[68px] overflow-hidden rounded-[6px]">
                  <Image
                    src={imgAlbum}
                    alt=""
                    fill
                    sizes="68px"
                    className="object-cover"
                  />
                </div>
                <div className="type-mono flex flex-col gap-[2px]">
                  <p className="text-[16px] font-medium leading-6 text-[var(--text-primary)]">
                    Man Of The Year
                  </p>
                  <p className="text-[14px] font-medium leading-5 tracking-[-0.14px] text-[var(--text-tertiary)]">
                    Lorde
                  </p>
                </div>
              </div>
            </article>

            <article className="flex h-full flex-col justify-between overflow-hidden rounded-[12px] border border-[#cecece] bg-gradient-to-b from-white to-[#d4d4d4] to-[182.4%] px-3 py-2 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.08)]">
              <div className="flex flex-col gap-[2px]">
                <div className="type-mono flex items-center justify-between">
                  <p className="text-[16px] font-medium leading-6 text-[var(--text-primary)]">
                    Tbilisi, Georgia
                  </p>
                  <p className="text-[20px] font-normal leading-7 tracking-[0.4px] text-[var(--text-primary)]">
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
                <p className="text-[14px] font-normal leading-5 text-[var(--text-tertiary)]">
                  -4 hrs CET
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>

      <footer className="mx-auto flex w-full max-w-[1440px] items-center justify-center px-6 pb-10 pt-20 md:px-14 lg:px-[140px]">
        <div className="flex flex-col items-center justify-center gap-[6px] whitespace-nowrap text-center text-[14px] font-normal leading-5 text-[var(--text-tertiary)]">
          <p>⊹ ࣪ ˖ Built with love &amp; Cursor ⋆˙⟡</p>
          <p>Changelog: 28.02.26</p>
        </div>
      </footer>
    </section>
  );
}
