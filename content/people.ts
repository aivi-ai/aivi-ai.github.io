export interface Person {
  name: string;
  credential: string;
  focusArea: string;
  bio: string;
  link?: string;
  image?: string;
}

// [FOUNDER INPUT] — add real, consented people here before launch.
// Each person must have given explicit consent to be listed.
// TODO(founder): Add founder card and any associate cards.
export const people: Person[] = [];
