export default function Footer() {
  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Courses", href: "#courses" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "FAQ", href: "#faq" },
    { label: "Register", href: "/register" },
  ];
  const socials = ["IG", "FB", "TG", "WA"];

  return (
    <footer className="relative w-full overflow-hidden bg-[#fafafa] pt-10 sm:pt-16">
      {/* 1. Giant Background Text Layer */}
      {/* Adjusted text color and z-index so the footers of the letters overlap beautifully instead of hiding */}
      {/* <div className="absolute inset-x-0 top-0 z-20 flex justify-center select-none pointer-events-none overflow-visible">
        <h2 className="text-center font-sans text-[clamp(7rem,28vw,23rem)] font-extrabold uppercase leading-none tracking-[0.02em] text-transparent bg-clip-text bg-[linear-gradient(180deg,#f7f7f8_0%,#d9dade_26%,#8f9197_56%,#2f3238_78%,#050607_100%)] translate-y-[-5%]">
          FDTC
        </h2>
      </div> */}

      {/* Lower container only (FDTC text layer intentionally unchanged) */}
      <div className="relative z-10 mt-12 w-full bg-[#000000] px-4 pb-8 pt-10 sm:mt-24 sm:pt-14 md:mt-36 md:px-6 md:pb-10 md:pt-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-7 text-[#f3e7e1] sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
            <div>
              <div className="inline-flex items-center gap-2 text-lg font-semibold sm:text-xl">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#f3b8a6] text-[11px] font-bold text-[#2a1210] sm:h-7 sm:w-7 sm:text-xs">
                  IQ
                </span>
                IQ FS
              </div>
              <p className="mt-3 max-w-xs text-sm leading-6 text-[#d6c0b8] sm:mt-4">
                A modern fashion design and sewing training institute building the next generation of fashion professionals.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold sm:text-base">Quick Links</h4>
              <ul className="mt-3 space-y-2 text-sm text-[#d6c0b8] sm:mt-4 sm:space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="transition hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold sm:text-base">Contact</h4>
              <ul className="mt-3 space-y-2 text-sm text-[#d6c0b8] sm:mt-4 sm:space-y-2.5">
                <li>+251 91 159 2945</li>
                <li>hello@IQ FDTC.com</li>
                <li>Fashion District, City Center</li>
              </ul>
              <div className="mt-3 flex items-center gap-2 sm:mt-4 sm:gap-2.5">
                {socials.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-[11px] font-semibold text-[#f3e7e1] transition hover:bg-white/15 sm:h-7 sm:w-7 sm:text-[10px]"
                    aria-label={item}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold sm:text-base">Newsletter</h4>
              <p className="mt-3 text-sm leading-6 text-[#d6c0b8] sm:mt-4">
                Get updates on new programs and student stories.
              </p>
              <form className="mt-3 flex gap-2 sm:mt-4">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-full border border-white/15 bg-white/8 px-3.5 py-2.5 text-sm text-white placeholder:text-[#c8b2aa] outline-none sm:px-4"
                />
                <button
                  type="button"
                  className="rounded-full bg-[#f6c8c0] px-4 py-2.5 text-sm font-semibold text-[#2a1210] transition hover:brightness-95 sm:px-5"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-4 text-xs leading-5 text-[#c7b0a8] sm:mt-10 sm:gap-3 sm:pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 IQ FDTC Fashion Institute. All rights reserved.</p>
            <p>Crafted with care for future fashion professionals.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
