import { Condition } from "@/components/condition";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Monster, MONSTER_CONDITIONS, MonsterCondition } from "@/monsters/types";
import { LucidePlus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";

export const ConditionManager = (m: Monster) => {
  const [, setMonsters] = useLocalStorage<Monster[]>("monsters", []);

  const handleConditionChange = (condition: MonsterCondition, value: number) => {
    setMonsters((prev) => {
      const monsterIndex = prev.findIndex((monster) => monster.id === m.id);
      if (monsterIndex === -1) return prev;

      const newMonsters = [...prev];

      if (
        newMonsters[monsterIndex].conditions &&
        condition in newMonsters[monsterIndex].conditions
      ) {
        delete newMonsters[monsterIndex].conditions[condition];
        return newMonsters;
      }

      const conditions = {
        ...newMonsters[monsterIndex].conditions,
        [condition]: value,
      };

      newMonsters[monsterIndex].conditions = conditions;

      return newMonsters;
    });
  };

  return (
    <div className="z-30 relative w-full bottom-0 left-0 flex flex-col items-center justify-start">
      <ul className="inline-flex items-center justify-start gap-1 border-2 border-b-0 h-10 min-w-10">
        {(!m.conditions || !Object.keys(m.conditions).length) && (
          <li className="w-full flex items-center justify-center size-10">
            <LucidePlus className="w-6 h-6 text-foreground" />
          </li>
        )}
        {!!m.conditions &&
          Object.entries(m.conditions).map(([condition, value]) => (
            <li key={condition} className="flex w-full items-center justify-start size-10">
              <Condition condition={condition as MonsterCondition} value={value} />
            </li>
          ))}
      </ul>

      <Popover>
        <PopoverTrigger className="absolute z-20 w-full h-full top-0 left-0 opacity-0" />

        <PopoverContent className="w-full" side="top" align="center">
          <div className="flex flex-col items-start justify-start w-full h-full gap-2">
            <h3 className="text-lg font-bold text-foreground">Conditions</h3>
            <ul className="flex items-start justify-start w-full h-full gap-2">
              {MONSTER_CONDITIONS.map((condition) => (
                <li key={condition}>
                  <button
                    type="button"
                    className={cn("flex items-center justify-start w-full", {
                      "opacity-50": !!m.conditions && condition in m.conditions,
                    })}
                    onClick={() => handleConditionChange(condition, 1)}
                  >
                    <Condition condition={condition} value={1} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
