import aboutImage from "../../assets/images/2manager.jpg";
import { BookOpen, CalendarClock, GraduationCap, Scissors, Shirt } from 'lucide-react'
import { aboutHighlights } from '../../data/features'
import SectionHeading from '../ui/SectionHeading'

export default function AboutSection() {
  const getHighlightIcon = (highlight) => {
    const iconClasses = 'h-3.5 w-3.5'

    if (highlight === 'Practical hands-on learning') return <Scissors className={iconClasses} />
    if (highlight === 'Experienced instructors') return <GraduationCap className={iconClasses} />
    if (highlight === 'Modern sewing equipment') return <Shirt className={iconClasses} />
    if (highlight === 'Beginner-friendly programs') return <BookOpen className={iconClasses} />
    if (highlight === 'Flexible class schedules') return <CalendarClock className={iconClasses} />

    return <Scissors className={iconClasses} />
  }

  return (
    <section id="about" className="mt-6 bg-white px-4 py-10 sm:mt-10 sm:py-40 md:px-6 md:mt-50 mt-0 sm:mb-0 pt-0 sm:mb-0">
      <div>
        <h2 className="mx-auto pb-6 text-center text-2xl font-bold leading-snug bg-gradient-to-r from-[#F94F95] to-[#000000] bg-clip-text text-transparent sm:pb-12 sm:text-4xl">
          About IQFS - IQ Fashion School
        </h2>
      </div>
      <div className="mx-auto grid max-w-7xl items-center gap-6 sm:gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            // eyebrow="About Our Institute"
            title="Where creativity meets craftsmanship at IQ Fashion School"
            description="IQFS is a Modern Fashion Design and Sewing Institute focused on helping students develop practical tailoring and clothing production skills. Our programs combine creativity, technical sewing knowledge, and hands-on experience to prepare students for professional opportunities in the fashion industry."
          />

          <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:mt-8 sm:grid-cols-2 sm:gap-y-3 sm:text-base">
            {aboutHighlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2 sm:gap-3"
              >
                <span
                  className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full text-xs text-[var(--color-accent)] sm:h-5 sm:w-5"
                  aria-hidden="true"
                >
                  {getHighlightIcon(highlight)}
                </span>
                <span className="leading-6">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full max-w-[280px] justify-self-center sm:max-w-[500px] sm:[perspective:1000px]">
          <div className="overflow-hidden rounded-2xl border border-[var(--color-border-soft)] shadow-[-6px_12px_20px_rgba(0,0,0,0.2)] sm:rounded-3xl sm:shadow-[-10px_20px_30px_rgba(0,0,0,0.3)] sm:[transform:rotateY(-6deg)_rotateX(0deg)_rotateZ(0deg)]">
            <img
              src={aboutImage}
              alt="Instructor teaching fashion students in a sewing class"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
