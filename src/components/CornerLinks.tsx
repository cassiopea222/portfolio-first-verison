const EMAIL_ADDRESS = "ubulyndina@gmail.com";

export default function CornerLinks() {
  return (
    <div className="fixed bottom-6 right-6 z-40 hidden flex-col items-end min-[810px]:flex">
      <div className="flex items-center gap-4">
        <a
          href="https://www.linkedin.com/in/julia-bulyndina-872617241/"
          target="_blank"
          rel="noopener noreferrer"
          className="py-1 font-sans text-[18px] font-medium leading-[26px] text-[#818790] no-underline transition-colors hover:text-[var(--text-primary)]"
        >
          LinkedIn
        </a>
        <a
          href="/cv/julia-bulyndina-cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="py-1 font-sans text-[18px] font-medium leading-[26px] text-[#818790] no-underline transition-colors hover:text-[var(--text-primary)]"
        >
          Resume
        </a>
      </div>
      <a
        href={`mailto:${EMAIL_ADDRESS}`}
        className="py-1 font-sans text-[18px] font-medium leading-[26px] text-[#4b4d53] no-underline transition-colors hover:text-[var(--text-primary)]"
      >
        {EMAIL_ADDRESS}
      </a>
    </div>
  );
}
