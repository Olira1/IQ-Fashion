import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { testimonials } from '../../data/testimonials'
import SectionHeading from '../ui/SectionHeading'
import heroBackground from '../../assets/images/testmonial4.png'

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const testimonial = testimonials[activeIndex]

  console.log('Current testimonial:', testimonial);
  console.log('All testimonials:', testimonials);
  console.log('Active index:', activeIndex);

  const showNextTestimonial = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length)
  }

  const showPreviousTestimonial = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length)
  }

  if (!testimonial) return null

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden px-4 py-12 sm:py-20 md:px-6"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Students Say"
          description="Real feedback from learners who built practical sewing and fashion design skills through our hands-on training."
          className="[&_*]:text-white [&>h2]:text-2xl [&>p]:mt-3 [&>p]:text-sm [&>p]:leading-6 sm:[&>h2]:text-5xl sm:[&>p]:mt-5 sm:[&>p]:text-base sm:[&>p]:leading-8"
        />

        <figure className="relative mt-8 rounded-2xl border border-white/20 bg-white/90 p-4 text-center shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:mt-12 sm:rounded-3xl sm:p-8 md:p-12">
          <button
            type="button"
            onClick={showPreviousTestimonial}
            className="absolute left-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-accent)]/35 bg-white text-[var(--color-accent)] transition hover:scale-105 hover:bg-[var(--color-accent)] hover:text-white sm:left-4 sm:top-4 sm:h-10 sm:w-10 md:left-6 md:top-6"
            aria-label="Show previous testimonial"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={showNextTestimonial}
            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-accent)]/35 bg-white text-[var(--color-accent)] transition hover:scale-105 hover:bg-[var(--color-accent)] hover:text-white sm:right-4 sm:top-4 sm:h-10 sm:w-10 md:right-6 md:top-6"
            aria-label="Show next testimonial"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="mx-auto mb-4 h-14 w-14 overflow-hidden rounded-full border-2 border-[var(--color-accent)]/70 shadow-[0_4px_12px_rgba(0,0,0,0.15)] sm:mb-6 sm:h-16 sm:w-16 md:mb-8 md:h-20 md:w-20 lg:h-60 lg:w-60">
            <img
              src={testimonial.image}
              alt={testimonial.imageAlt}
              className="h-full w-full object-cover"
              style={{
                objectPosition: testimonial.imagePosition ?? 'center top',
                transform: `scale(${testimonial.imageScale ?? 1.25})`,
              }}
            />
          </div>

          <blockquote className="px-8 font-[var(--font-display)] text-lg leading-8 text-[var(--color-ink)] sm:px-10 sm:text-2xl sm:leading-relaxed md:text-4xl">
            “{testimonial.quote}”
          </blockquote>

          <figcaption className="mt-5 sm:mt-8">
            <p className="text-sm font-semibold text-[var(--color-ink)] sm:text-base">
              {testimonial.name}
            </p>
            <p className="text-sm text-[var(--color-muted)]">{testimonial.role}</p>
          </figcaption>
        </figure>

        <div className="mt-4 flex items-center justify-center gap-2 sm:mt-5" aria-label="Testimonial slide indicators">
          {testimonials.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={activeIndex === index ? 'true' : undefined}
              onClick={() => setActiveIndex(index)}
              className={`rounded-full transition ${
                activeIndex === index
                  ? 'h-2.5 w-5 bg-[var(--color-accent)]'
                  : 'h-2.5 w-2.5 bg-white/65 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
