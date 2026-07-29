export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company?: string;
  service?: string; // slug
}

// Empty at launch. Add real, consented quotes here when available.
// The <Testimonials> component renders nothing when this array is empty.
export const testimonials: Testimonial[] = [];
