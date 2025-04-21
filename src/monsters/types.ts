import { Layout } from "react-grid-layout";

export type MonsterType = "normal" | "elite" | "boss";

export type MonsterLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type MonsterSkills =
  | "poison"
  | "wound"
  | "immobilize"
  | "stun"
  | "curse"
  | "disarm"
  | "push"
  | "pull"
  | "heal"
  | "shield"
  | "retaliate"
  | "death"
  | "disadvantage"
  | "muddle";

export const MONSTER_CONDITIONS = [
  "poison",
  "wound",
  "immobilize",
  "stun",
  "disarm",
  "muddle",
] as const;
export type MonsterCondition = (typeof MONSTER_CONDITIONS)[number];

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
};
