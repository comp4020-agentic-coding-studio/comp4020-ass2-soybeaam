import type { ImageMetadata } from "astro";

// The images already claimed by the home page and the four collection index
// pages (hero-home.avif, library_books_coffee, study_laptop_equations,
// to_do_list_productivity, graduation_books) are deliberately excluded here —
// this pool is for the per-item pages (individual sessions/lectures/
// assessments, plus policies) so no image is reused between an index and the
// items it lists.
import img01 from "../assets/images/01_library_study.png";
import img02 from "../assets/images/02_university_campus.png";
import img03 from "../assets/images/03_student_studying.png";
import img04 from "../assets/images/04_lecture_hall.png";
import img05 from "../assets/images/05_key_concepts_notes.png";
import img06 from "../assets/images/06_laptop_study.png";
import img07 from "../assets/images/07_study_supplies.png";
import img08 from "../assets/images/08_campus_students.png";
import img09 from "../assets/images/09_graduation.png";
import imgLaptopWorkspace from "../assets/images/laptop_notebook_workspace.png";
import imgWarmDesk from "../assets/images/warm_study_desk.png";

interface HeroImage {
  image: ImageMetadata;
  alt: string;
}

const pool: HeroImage[] = [
  { image: img01, alt: "Rows of quiet library shelves with a student reading at a study table" },
  { image: img02, alt: "A university campus building under an open sky" },
  { image: img03, alt: "A student annotating a printed reading at a desk" },
  { image: img04, alt: "Rows of seating in an empty lecture hall" },
  { image: img05, alt: "Handwritten notes mapping out a set of key concepts" },
  { image: img06, alt: "A laptop open on a desk mid-study session" },
  { image: img07, alt: "Notebooks, pens and highlighters laid out for a study session" },
  { image: img08, alt: "Students walking across a university campus between classes" },
  { image: img09, alt: "A graduation cap resting on a stack of finished coursework" },
  { image: imgLaptopWorkspace, alt: "A laptop and notebook arranged on a tidy desk workspace" },
  { image: imgWarmDesk, alt: "A warmly lit study desk in the evening" },
];

/** Deterministic pick by position, so the same item always gets the same image across builds. */
function heroAt(index: number): HeroImage {
  return pool[((index % pool.length) + pool.length) % pool.length];
}

/** Hero image for a numbered item (a session or lecture week, 1-indexed). */
export function heroForWeek(week: number): HeroImage {
  return heroAt(week - 1);
}

/** Hero image for a slug-keyed item (assessments have no week number). */
export function heroForSlug(slug: string): HeroImage {
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return heroAt(hash);
}
