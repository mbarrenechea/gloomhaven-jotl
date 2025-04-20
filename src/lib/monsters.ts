import { Monster } from "@/monsters/types";
import { useLocalStorage } from "usehooks-ts";
import { groupBy } from "./utils";

import MONSTERS from "@/data/monsters.json";

export const useMonsters = () => {
  const [monsters] = useLocalStorage<Monster[]>("monsters", []);

  return monsters.sort((a, b) => {
    if (a.monsterId === b.monsterId) {
      return a.index - b.index;
    }
    return a.monsterId.localeCompare(b.monsterId);
  });
};

export const useMonstersGroups = () => {
  const [monsters] = useLocalStorage<Monster[]>("monsters", []);

  const MONSTERS_GROUP = groupBy<Monster>(monsters, ["monsterId", "type", "level"]);

  return MONSTERS_GROUP;
};

export const useMonsterStats = (
  id: Monster["id"],
  type: Monster["type"],
  level: Monster["level"],
) => {
  const monster = MONSTERS.find((monster) => monster.id === id);
  if (!monster) return null;

  const stats = monster[type];

  return {
    name: monster.name,
    health: stats.health[level],
    movement: stats.movement[level],
    attack: stats.attack[level],
    skills: stats.skills[level],
    level: level,
    type: type,
  };
};
