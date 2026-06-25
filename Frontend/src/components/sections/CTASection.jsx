import Button from '../ui/Button'
import ctaBackground from "../../assets/images/button.png";

export default function CTASection() {
  return (
    <section className="px-4 pb-20 md:px-6 bg-[#FFF9F3]">
      <div className="mx-auto max-w-5xl">
        <div
          className="relative overflow-hidden rounded-3xl border border-white/20 px-5 py-8 text-white shadow-[0_16px_40px_rgba(0,0,0,0.18)] md:px-10 md:py-10"
          style={{
            backgroundImage: `linear-gradient(95deg, rgba(22,16,16,0.78) 0%, rgba(22,16,16,0.62) 42%, rgba(22,16,16,0.3) 68%, rgba(22,16,16,0.08) 100%), url(${ctaBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-md">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/75 md:text-[10px]">
              Your Future Awaits
            </p>
            <h2 className="mt-2.5 `font-[var(--font-display)]` text-4xl leading-[1.1] text-balance md:text-5xl">
              Start Your Fashion Journey Today
            </h2>
            <p className="mt-3 max-w-sm text-[11px] leading-5 text-white/80 md:text-xs">
              Build practical sewing and fashion design skills with expert-led
              training programs.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <Button
                href="/register"
                size="sm"
                variant="secondary"
                className="border-white/70 bg-white text-[11px] `text-[var(--color-ink)]`"
              >
                Register Now
              </Button>
              <Button
                href="#contact"
                size="sm"
                variant="secondary"
                className="border-white/45 bg-white/12 text-[11px] text-white hover:bg-white/18 hover:text-white"
              >
                Contact Us
              </Button>
              <Button
                href="#contact"
                size="sm"
                className="border border-transparent bg-[linear-gradient(90deg,#f7c79f_0%,#f29cc1_100%)] px-5 py-2 text-[11px] text-[#5b2a41] shadow-none hover:brightness-105"
              >
                Join Telegram
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
