import type { ReactNode } from "react";

type MetaItem = { label: string; value: ReactNode };

export default function CaseStudyMeta({
  items,
  accent = false,
  accentColor = "#157ebe",
}: {
  items: MetaItem[];
  /** Inter Semibold colored labels (matches Figma's Governmental Platform meta row) instead of the default grey mono labels. */
  accent?: boolean;
  /** Accent label color when `accent` is true. Defaults to blue; each case study can pass its own. */
  accentColor?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-6 max-[402px]:flex-col max-[402px]:gap-[20px]">
      {items.map(({ label, value }) => (
        <div key={label} className="flex w-[200px] flex-col gap-[8px] max-[402px]:w-full">
          <p
            className={
              accent
                ? "text-[16px] font-semibold uppercase leading-6"
                : "font-inconsolata text-[18px] font-semibold uppercase leading-6 text-[var(--text-tertiary)]"
            }
            style={accent ? { color: accentColor } : undefined}
          >
            {label}
          </p>
          <div className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            {value}
          </div>
        </div>
      ))}
    </div>
  );
}
