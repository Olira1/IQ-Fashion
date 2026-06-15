import { useEffect, useRef, useState } from 'react'
import { portfolioItems } from '../../data/portfolio'
import { resolveImagePath } from '../../utils/imageResolver'
import SectionHeading from '../ui/SectionHeading'

export default function PortfolioSection() {
  const displayItems = portfolioItems.slice(0, 12)
  const cardTilt = ['rotate-0', 'rotate-0', 'rotate-0', 'rotate-0', 'rotate-0', 'rotate-0']
  const cardDepth = [
    "[transform:rotateY(0deg)_rotateX(0deg)]",
    "[transform:rotateY(0deg)_rotateX(0deg)]",
    "[transform:rotateY(0deg)_rotateX(0deg)]",
    "[transform:rotateY(0deg)_rotateX(0deg)]",
    "[transform:rotateY(0deg)_rotateX(0deg)]",
    "[transform:rotateY(0deg)_rotateX(0deg)]",
    "[transform:rotateY(0deg)_rotateX(0deg)]",
    "[transform:rotateY(0deg)_rotateX(0deg)]",
    "[transform:rotateY(0deg)_rotateX(0deg)]",
    "[transform:rotateY(0deg)_rotateX(0deg)]",
    "[transform:rotateY(0deg)_rotateX(0deg)]",
    "[transform:rotateY(0deg)_rotateX(0deg)]",
  ];
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollContainerRef = useRef(null)
  const cardRefs = useRef([])

  const updateActiveIndexFromScroll = () => {
    const container = scrollContainerRef.current
    if (!container) return

    const cards = cardRefs.current.filter(Boolean)
    if (!cards.length) return

    const containerCenter = container.scrollLeft + container.clientWidth / 2
    let closestIndex = 0
    let closestDistance = Number.POSITIVE_INFINITY

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const distance = Math.abs(cardCenter - containerCenter)

      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })

    setActiveIndex(closestIndex)
  }

  const scrollToCard = (index) => {
    const container = scrollContainerRef.current
    const targetCard = cardRefs.current[index]
    if (!container || !targetCard) return

    const targetLeft =
      targetCard.offsetLeft - (container.clientWidth - targetCard.offsetWidth) / 2

    container.scrollTo({
      left: targetLeft,
      behavior: 'smooth',
    })
    setActiveIndex(index)
  }

  useEffect(() => {
    updateActiveIndexFromScroll()
  }, [])

  return (
    <section id="portfolio" className="bg-white px-4 py-12 sm:py-20 md:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Student Portfolio"
          title="Student Creations & Practical Projects"
          description="Our students gain hands-on experience by creating real clothing projects during training — from sketch to finished piece."
          className="[&>h2]:text-2xl [&>p]:mt-3 [&>p]:text-sm [&>p]:leading-6 sm:[&>h2]:text-5xl sm:[&>p]:mt-5 sm:[&>p]:text-base sm:[&>p]:leading-8"
        />

        <div
          ref={scrollContainerRef}
          className="portfolio-scroll mt-8 overflow-x-auto pb-4 pt-6 sm:mt-12 sm:pb-6 sm:pt-12"
          onScroll={updateActiveIndexFromScroll}
        >
          <div className="mx-auto flex min-w-max items-end justify-center gap-4 px-2 [perspective:1400px] sm:gap-7 sm:px-4 md:gap-8">
            {displayItems.map((item, index) => (
              <article
                key={item.id}
                ref={(element) => {
                  cardRefs.current[index] = element
                }}
                className={`group h-auto w-[235px] shrink-0 overflow-hidden rounded-2xl border border-[#dadcdf] bg-[#f1f2f4] shadow-[0_12px_20px_rgba(26,16,35,0.2)] transition duration-300 sm:w-[300px] sm:rounded-[30px] sm:shadow-[0_20px_34px_rgba(26,16,35,0.24)] ${cardTilt[index] ?? 'rotate-0'} ${cardDepth[index] ?? '[transform:rotateY(0deg)_rotateX(6deg)]'} ${activeIndex === index ? 'ring-2 ring-[var(--color-accent)]/45' : ''} hover:z-10 hover:-translate-y-2 hover:[transform:rotateX(0deg)_rotateY(0deg)_rotateZ(0deg)] hover:shadow-[0_28px_48px_rgba(26,16,35,0.34)]`}
              >
                <div className="h-[250px] overflow-hidden sm:h-[350px] md:h-[380px]">
                  <img
                    src={resolveImagePath(item.imageSrc, '')}
                    alt={item.imageAlt}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-1 flex items-center justify-center gap-2 sm:mt-2" aria-label="Portfolio slide indicators">
          {displayItems.map((item, index) => (
            <button
              key={`dot-${item.id}`}
              type="button"
              aria-label={`Go to portfolio image ${index + 1}`}
              aria-current={activeIndex === index ? 'true' : undefined}
              onClick={() => scrollToCard(index)}
              className={`rounded-full transition ${
                activeIndex === index
                  ? 'h-3 w-6 bg-[var(--color-accent)]'
                  : 'h-2.5 w-2.5 bg-[#9a3c63]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
