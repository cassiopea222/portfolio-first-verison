const typographyTokens = [
  {
    name: "type-display",
    className: "type-display",
    sample: "Display text for key hero statements",
  },
  {
    name: "type-h1",
    className: "type-h1",
    sample: "Heading 1 for major section intros",
  },
  {
    name: "type-h2",
    className: "type-h2",
    sample: "Heading 2 for core page sections",
  },
  {
    name: "type-h3",
    className: "type-h3",
    sample: "Heading 3 for cards and subheaders",
  },
  {
    name: "type-title",
    className: "type-title",
    sample: "Title text for role + company rows",
  },
  {
    name: "type-nav",
    className: "type-nav",
    sample: "Navigation and control labels",
  },
  {
    name: "type-body-lg",
    className: "type-body-lg",
    sample: "Large body copy for intros",
  },
  {
    name: "type-body",
    className: "type-body",
    sample: "Default body text for content blocks",
  },
  {
    name: "type-caption",
    className: "type-caption",
    sample: "Caption and supporting metadata",
  },
];

export default function TypographyPage() {
  return (
    <section className="mx-auto w-full max-w-[1440px] py-20 fluid-px">
      <div className="mx-auto max-w-[960px]">
        <div className="mb-12 space-y-4">
          <h1 className="type-h1 text-[var(--text-primary)]">Typography Preview</h1>
          <p className="type-body text-[var(--text-secondary)]">
            Inter-based typography tokens following a shadcn-style semantic naming
            convention.
          </p>
        </div>

        <div className="space-y-8">
          {typographyTokens.map((token) => (
            <article key={token.name} className="rounded-2xl border border-black/10 p-6">
              <p className="type-caption mb-4 text-[var(--text-tertiary)]">{token.name}</p>
              <p className={`${token.className} type-measure text-[var(--text-primary)]`}>
                {token.sample}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
