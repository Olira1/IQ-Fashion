import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import logo from '../../assets/images/logo.jpg'
import heroBackground from '../../assets/images/herosection.png'
import Button from '../ui/Button'
import video from '../../assets/Video/final.mp4'
import { cn } from '../../utils/cn'

export default function HeroSection() {
  const heroRef = useRef(null)
  const [isHeaderSolid, setIsHeaderSolid] = useState(false)
  const [activeNavLink, setActiveNavLink] = useState('#hero')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationLinks = [
    ['Home', '#hero'],
    ['Courses', '#courses'],
    ['Portfolio', '#portfolio'],
    ['How it Works', '#how-it-works'],
    ['FAQ', '#faq'],
    ['Contact', '#contact'],
  ]

  const toggleMobileMenu = () => setIsMobileMenuOpen((open) => !open)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return
      const heroBottom = heroRef.current.getBoundingClientRect().bottom
      setIsHeaderSolid(heroBottom <= 0)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  useEffect(() => {
    const sectionIdToHref = new Map(
      navigationLinks.map(([, href]) => [href.slice(1), href]),
    )

    const sections = navigationLinks
      .map(([, href]) => document.querySelector(href))
      .filter(Boolean)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!visibleEntry?.target?.id) return

        const href = sectionIdToHref.get(visibleEntry.target.id)
        if (href) setActiveNavLink(href)
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: '-35% 0px -35% 0px',
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
      observer.disconnect()
    }
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="md:relative mb-16 md:overflow-visible md:bg-black pb-20 text-white sm:mb-20 sm:pb-24 md:pb-32 min-h-screen"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <video
        className="absolute inset-0 max-sm:h-[750px] h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster={heroBackground}
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className="absolute inset-0 max-sm:h-[750px] bg-black/70" />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isHeaderSolid
            ? "border-b border-white/10 bg-[#FFF9F3] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-4 sm:py-4 md:px-6 md:py-5">
          <a
            href="#hero"
            className="inline-flex items-center gap-2.5"
            onClick={closeMobileMenu}
          >
            <img
              src={logo}
              alt="FDTC Academy logo"
              className="h-10 w-10 rounded-full border border-[var(--color-accent)]/70 object-cover sm:h-12 sm:w-12"
            />
            <span
              className={`text-sm font-extrabold tracking-wide sm:text-lg ${
                isHeaderSolid ? "text-[#C23B6F]" : "text-[#C23B6F]"
              }`}
            >
              IQ
            </span>
          </a>

          <nav className="hidden items-center gap-18 rounded-full border border-white/15 bg-black/35 px-5 py-2 backdrop-blur-sm lg:flex">
            {navigationLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                aria-current={activeNavLink === href ? "page" : undefined}
                className={`text-base italic transition-colors ${
                  activeNavLink === href
                    ? "text-[var(--color-accent)]"
                    : "text-white/90 hover:text-[var(--color-accent)]"
                }`}
                onClick={() => setActiveNavLink(href)}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              href="/register"
              size="sm"
              className="min-w-0 px-4 py-2 text-xs sm:min-w-32 sm:text-sm"
            >
              Register Now
            </Button>

            <button
              type="button"
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-controls="hero-mobile-navigation"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/25 bg-black/35 text-white backdrop-blur-sm transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] lg:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <nav
          id="hero-mobile-navigation"
          className={cn(
            "overflow-hidden border-t border-white/15 bg-black/75 backdrop-blur-md transition-all duration-300 lg:hidden",
            isMobileMenuOpen
              ? "max-h-[380px] opacity-100"
              : "max-h-0 border-t-0 opacity-0",
          )}
        >
          <ul className="space-y-1 px-3 py-3 sm:px-4">
            {navigationLinks.map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  aria-current={activeNavLink === href ? "page" : undefined}
                  onClick={() => {
                    setActiveNavLink(href);
                    closeMobileMenu();
                  }}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm transition-colors",
                    activeNavLink === href
                      ? "bg-white/10 text-[var(--color-accent)]"
                      : "text-white/90 hover:bg-white/10 hover:text-[var(--color-accent)]",
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 sm:pt-28 md:px-6 md:pt-28 mb-20 sm:mb-0 max-sm:mb-32 md:mb-0 max-sm:h-[550px] flex items-center">
        <div className="mx-auto max-w-4xl max-sm:mt-25 pb-24 pt-14 text-center sm:pb-32 sm:pt-20 md:pb-60 md:pt-40 w-full">
          <h1 className="font-sans text-[2rem] font-bold leading-[1.18] text-white sm:text-4xl sm:leading-tight md:text-6xl lg:text-5xl">
            IQFS - IQ Fashion School
            <span className="block mt-1 text-2xl sm:mt-0 sm:text-inherit">
              for Modern Fashion Design and Sewing{" "}
            </span>
            <span className="font-[var(--font-display)] italic text-[var(--color-accent)]">
              From Industry Experts
            </span>
            <br />
            {/* From Industry Experts */}
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-sm font-semibold leading-6 text-white/85 sm:text-base md:mt-6 md:leading-7">
            <span className="sm:hidden">
              IQFS is a Modern Fashion Design and Sewing Institute helping
              Ethiopian students build practical tailoring skills.
            </span>
            <span className="hidden sm:inline">
              IQ Fashion School is a Modern Fashion Design and Sewing Institute
              helping Ethiopian students master practical tailoring, creative
              design techniques, and real-world garment production through
              immersive, hands-on training.
            </span>
          </p>

          <div className="mt-8 flex w-full flex-col items-center gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:justify-center sm:gap-4">
            <Button
              href="/register"
              className="w-full max-w-[280px] sm:w-auto sm:min-w-40"
            >
              Register Now
            </Button>
            <Button
              href="#schedules"
              // variant="secondary"
              className="w-full max-w-[280px] border-white/20 bg-gradient-to-r from-[#F94F95] to-[#000000] text-white hover:opacity-90 sm:w-auto sm:min-w-40"
            >
              View Schedule
            </Button>
            <Button
              href="#contact"
              // variant="secondary"
              className="w-full max-w-[280px] border-white/20 bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white hover:opacity-90 sm:w-auto sm:min-w-40"
            >
              Contact
            </Button>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 max-sm:-bottom-16 z-10">
        <svg
          viewBox="0 0 1440 210"
          className="h-28 w-full md:h-36"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="var(--color-white)"
            d="M0,140 C190,205 380,190 600,145 C810,104 1020,118 1200,155 C1310,178 1380,182 1440,167 L1440,210 L0,210 Z"
          />
        </svg>
      </div>

      <div className="relative z-20 -mt-8 px-4 sm:-mt-12 md:-mt-8 md:px-6 lg:-mt-14 mb-20 sm:mb-32 md:mb-0">
        <div className="mx-auto max-w-5xl text-center">
          <div className="rounded-2xl border border-[var(--color-accent)]/25 bg-white/70 p-4 shadow-[0_10px_30px_rgba(248,79,149,0.15)] backdrop-blur-sm sm:rounded-3xl sm:p-6 -mb-24 sm:-mb-100 md:p-8 md:-mb-85 md:min-h-100">
            <div className=" grid gap-6 md:grid-cols-3 md:gap-0">
              {[
                [
                  "1000+",
                  "Students Empowered",
                  "Thousands of learners turned passion into practical sewing and fashion skills.",
                  "Join a growing community of aspiring fashion designers and sewing professionals who have transformed their passion into practical skills through our comprehensive training programs.",
                ],
                [
                  "100%",
                  "Hands-On Learning",
                  "Learn by doing with real fabrics, machines, and guided studio projects.",
                  "From the very first lesson, students work with real fabrics, sewing machines, and practical projects that build confidence through experience rather than theory alone.",
                ],
                [
                  "95%",
                  "Satisfaction Rate",
                  "Students trust our training quality, expert support, and career-focused guidance.",
                  "Our commitment to quality education, expert guidance, and student success has earned the trust and satisfaction of learners throughout their fashion journey.",
                ],
              ].map(
                (
                  [number, title, mobileDescription, desktopDescription],
                  index,
                ) => (
                  <article
                    key={`${number}-${index}`}
                    className="px-2 sm:px-4 md:border-r md:border-[var(--color-border-soft)] md:last:border-r-0 md:px-5"
                  >
                    <p className="font-sans text-3xl font-bold text-[#8a2108] sm:text-4xl md:text-5xl">
                      {number}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-[var(--color-ink)] sm:mt-3 sm:text-2xl md:text-3xl">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-muted)] md:mt-3 md:text-base md:leading-7">
                      <span className="sm:hidden">{mobileDescription}</span>
                      <span className="hidden sm:inline">
                        {desktopDescription}
                      </span>
                    </p>
                  </article>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
