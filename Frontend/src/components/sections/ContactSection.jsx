import { contactDetails } from '../../data/contact'
import { socialLinks } from '../../data/navigation'
import SectionHeading from '../ui/SectionHeading'

const contactIconById = {
  phone: 'P',
  whatsapp: 'W',
  telegram: 'T',
  email: 'E',
  address: 'A',
}

const socialIconByLabel = {
  Instagram: 'I',
  Facebook: 'F',
  Telegram: 'T',
  TikTok: 'K',
}

export default function ContactSection() {
  if (!contactDetails.length) return null

  return (
    <section
      id="contact"
      className="bg-[var(--color-cream)] px-4 py-12 sm:py-20 md:px-6"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Contact Us"
          className="[&>h2]:text-2xl sm:[&>h2]:text-5xl"
        />

        <div className="mt-8 grid items-start gap-6 sm:mt-12 sm:gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-2xl border border-[var(--color-border-soft)] bg-white p-3.5 shadow-sm sm:rounded-3xl sm:p-4">
            {contactDetails.map((item) => (
              <article
                key={item.id}
                className={`mb-2.5 flex gap-2.5 rounded-xl border border-[var(--color-border-soft)] bg-[#fbfbfb] px-3 py-2.5 last:mb-0 sm:mb-3 sm:gap-3 sm:rounded-2xl ${
                  item.lines ? "items-start" : "items-center"
                }`}
              >
                <span
                  className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-peach)] text-[11px] font-bold text-[var(--color-accent-deep)] sm:h-7 sm:w-7 sm:text-[10px] ${
                    item.lines ? "mt-0.5" : ""
                  }`}
                >
                  {contactIconById[item.id] ?? "?"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9b8f89] sm:text-[10px]">
                    {item.label}
                  </p>
                  {item.lines ? (
                    <div className="mt-1 space-y-1.5">
                      {item.lines.map((line) => (
                        <p
                          key={line}
                          className="break-words text-sm leading-relaxed text-[var(--color-ink)] sm:text-sm"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  ) : item.href ? (
                    <a
                      className="break-all text-sm text-[var(--color-ink)] transition hover:text-[var(--color-accent)] sm:truncate sm:text-xs"
                      href={item.href}
                      rel="noreferrer"
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="break-words text-sm text-[var(--color-ink)] sm:truncate sm:text-xs">
                      {item.value}
                    </p>
                  )}
                </div>
              </article>
            ))}

            {/* <article className="mt-2.5 rounded-xl border border-[var(--color-border-soft)] bg-[#fbfbfb] px-3 py-3 sm:mt-3 sm:rounded-2xl">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#9b8f89] sm:text-[10px]">
                Follow Us
              </h3>
              <div className="mt-2.5 flex flex-wrap gap-2.5 sm:gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border-soft)] bg-white text-[11px] font-semibold text-[var(--color-muted)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] sm:h-6 sm:w-6 sm:text-[10px]"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {socialIconByLabel[social.label] ??
                      social.label.slice(0, 1)}
                  </a>
                ))}
              </div>
            </article> */}
          </div>

          <div>
            <div className="overflow-hidden rounded-2xl border border-[var(--color-border-soft)] bg-white shadow-sm">
              <iframe
                title="IQ TDTC location map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d493.1980050814542!2d37.97178593085545!3d8.539699964284445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164d29004a4c39a3%3A0x7f20afe77283b2c6!2sIQ%20Fashion!5e0!3m2!1sen!2set!4v1782391508827!5m2!1sen!2set"




                className="h-[220px] w-full sm:h-[270px] md:h-[300px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
