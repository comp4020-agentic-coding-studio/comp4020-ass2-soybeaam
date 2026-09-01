import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  related?: string[];
  meta?: Record<string, unknown>;
}

interface CourseApi {
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;
const byType = (type: string) => api.nodes.filter((node) => node.type === type);

describe("course shape", () => {
  it("has exactly twelve teaching weeks of sessions and lectures", () => {
    expect(byType("sessions")).toHaveLength(12);
    expect(byType("lectures")).toHaveLength(12);
  });

  it("cross-links every session and lecture for the same week", () => {
    const sessions = byType("sessions");
    const lectures = byType("lectures");
    for (const session of sessions) {
      const week = session.meta?.week;
      const partner = lectures.find((lecture) => lecture.meta?.week === week);
      expect(partner, `no lecture for week ${week}`).toBeDefined();
      expect(
        session.related?.includes(partner!.id) || partner!.related?.includes(session.id),
        `${session.id} and ${partner!.id} don't reference each other`,
      ).toBe(true);
    }
  });

  it("has at least one lecture with a real, resolvable slide deck", () => {
    const withSlides = byType("lectures").filter((lecture) => typeof lecture.meta?.slides === "string");
    expect(withSlides.length).toBeGreaterThanOrEqual(1);
    for (const lecture of withSlides) {
      expect(lecture.meta?.slides, `${lecture.id} has a malformed slides path`).toMatch(/^\/decks\/[a-z0-9-]+\/$/);
    }
  });

  it("weights every assessment so the scheme sums to exactly 100", () => {
    const assessments = byType("assessments");
    const total = assessments.reduce((sum, node) => sum + (Number(node.meta?.weight) || 0), 0);
    expect(total).toBe(100);
  });
});
