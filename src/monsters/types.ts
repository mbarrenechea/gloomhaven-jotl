export type MonsterType = "normal" | "elite";

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
  | "retaliate";

export type Monster = {
  id: string;
  name: string;
  index: number;
  level: MonsterLevel;
  type: MonsterType;
  health: number;
  movement: number;
  attack: number;
  skills?: MonsterSkills[];
};
