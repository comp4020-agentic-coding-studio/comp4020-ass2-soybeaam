// Canberra. `Australia/Sydney` rather than `Australia/Canberra` because the
// former is the canonical IANA zone and the latter is only an alias — some
// runtimes ship the canonical set only. Same wall clock either way.
const COURSE_TIME_ZONE = "Australia/Sydney";

const longDate = new Intl.DateTimeFormat("en-AU", {
  dateStyle: "long",
  timeZone: "UTC",
});

/** Format a date-only value without letting the viewer's timezone move it. */
export function formatCourseDate(value: Date | string): string {
  const date = typeof value === "string" ? new Date(`${value}T00:00:00Z`) : value;
  return longDate.format(date);
}

// Deliberately built from explicit components rather than `dateStyle`:
// combining `dateStyle` with `hour`/`minute` throws a TypeError, and the date
// half has to keep matching `formatCourseDate` above so the two read as one
// convention across the site.
const dueDateTime = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: COURSE_TIME_ZONE,
});

/**
 * Format an assessment deadline *with its time*, in the course's own timezone.
 *
 * Every `due:` in the assessments collection carries a real time-of-day, but
 * `formatCourseDate` renders date-only, so a midday deadline displayed as
 * "11 May 2026" invites a reader to assume end-of-day and hand in twelve hours
 * late. The deadline is the single most consequential number on the page; it
 * gets printed in full.
 *
 * Rendered in Canberra time, not UTC and not the viewer's zone: the deadline
 * is a fact about the course, and a student abroad needs to see the time the
 * deadline actually falls at, labelled, rather than one silently shifted into
 * wherever their laptop thinks it is.
 */
export function formatCourseDueDate(value: Date | string): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return dueDateTime.format(date);
}
