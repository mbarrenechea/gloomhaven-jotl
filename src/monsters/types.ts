import { Layout } from "react-grid-layout";

export type MonsterType = "normal" | "elite" | "boss";

export type MonsterLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const MONSTER_SKILLS = [
  "poison",
  "shield",
  "muddle",
  "death",
  "advantage",
  "disadvantage",
  "wound",
] as const;
export type MonsterSkills = (typeof MONSTER_SKILLS)[number];

export const MONSTER_CONDITIONS = [
  "poison",
  "wound",
  "immobilize",
  "stun",
  "disarm",
  "muddle",
] as const;
export type MonsterCondition = (typeof MONSTER_CONDITIONS)[number];

export const MONSTER_INMUNITIES = [
  "poison",
  "wound",
  "immobilize",
  "stun",
  "disarm",
  "muddle",
  "curse",
] as const;
export type MonsterInmunities = (typeof MONSTER_INMUNITIES)[number];

export type Monster = {
  id: string;
  monsterId: string;
  name: string;
  image: string;
  index: number;
  grid: Layout;
  level: MonsterLevel;
  type: MonsterType;
  health: number;
  movement: string | number;
  attack: number;
  skills: Partial<Record<MonsterSkills, number>> | null;
  conditions: Partial<Record<MonsterCondition, number>> | null;
  inmunities?: MonsterInmunities[] | undefined;
  special?: string[];
};
