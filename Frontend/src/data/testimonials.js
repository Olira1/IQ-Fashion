import testimonialImage1 from '../assets/images/testmonial1.png'
import testimonialImage2 from '../assets/images/testimonial3.png'
import testimonialImage3 from '../assets/images/testimonial2.png'

console.log('Testimonial Images:', {
  testimonialImage1,
  testimonialImage2,
  testimonialImage3
});

export const testimonials = [
  {
    id: 'amina-h',
    quote:
      'The practical classes helped me start sewing professionally after only a few months.',
    name: 'Adanech Kassa',
    role: 'Fashion Design Graduate',
    initials: 'A',
    image: testimonialImage1,
    imageAlt: 'Amina H., Basic Sewing Graduate at IQ Fashion School',
    imagePosition: 'center 15%',
    imageScale: 1,
  },
  {
    id: 'samira-k',
    quote:
      'The instructors were patient and practical. I now confidently create custom dresses for paying clients.',
    name: 'sadiq Abdo',
    role: 'Fashion Design Graduate',
    initials: 'S',
    image: testimonialImage2,
    imageAlt: 'Samira K., Fashion Design Graduate at IQ Fashion School',
    imagePosition: 'center 12%',
    imageScale: 1,
  },
  {
    id: 'dawit-t',
    quote:
      'From sketching to final stitching, every module was clear. The weekend class fit perfectly with my work schedule.',
    name: 'Rehma  Werke',
    role: 'Weekend Program Graduate',
    initials: 'D',
    image: testimonialImage3,
    imageAlt: 'Dawit T., Weekend Program Graduate at IQ Fashion School',
    imagePosition: 'center 20%',
    imageScale: 1,
  },
];
