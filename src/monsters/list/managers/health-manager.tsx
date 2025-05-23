import { Monster } from "@/monsters/types";
import { useLocalStorage } from "usehooks-ts";

import MONSTERS from "@/data/monsters.json";

import { createParser } from "@adifkz/exp-p";

const parser = createParser();

export const HealthManager = (m: Monster) => {
  const [players] = useLocalStorage("players", 4);
  const { id, type, level, monsterId } = m;

  const MONSTER = MONSTERS.find((monster) => monster.id === monsterId);

  const [, setMonsters] = useLocalStorage<Monster[]>("monsters", []);

  const handleHealthChange = (v: number) => {
    // Handle health increment logic here
    setMonsters((prev) => {
      const monsterIndex = prev.findIndex((monster) => monster.id === id);
      if (monsterIndex === -1) return prev;

      const newMonsters = [...prev];
      const monsterHealth = parser.evaluate(`${MONSTER?.[type]?.health[level]}`, { p: players });
      const h = Math.min(newMonsters[monsterIndex].health + v, monsterHealth || 0);

      if (h < 0) {
        newMonsters[monsterIndex].health = 0;

        return newMonsters;
      }

      if (h >= 0) {
        newMonsters[monsterIndex].health = h;

        return newMonsters;
      }

      return newMonsters;
    });
  };

  return (
    <div className="absolute z-10 w-full h-full top-0 left-0 flex flex-col items-center justify-center">
      <button
        type="button"
        className="w-full bg-transparent from-background/50 to-transparent active:bg-gradient-to-b h-1/3"
        onClick={() => handleHealthChange(1)}
      />
      <button
        type="button"
        className="grow w-full bg-transparent from-background/50 to-transparent active:bg-gradient-to-t"
        onClick={() => handleHealthChange(-1)}
      />
    </div>
  );
};
