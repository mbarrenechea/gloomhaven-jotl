import { Condition } from "@/components/condition";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Monster, MONSTER_CONDITIONS, MonsterCondition } from "@/monsters/types";
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
    <div className="z-30 relative w-full bottom-0 left-0 flex flex-col items-center justify-start h-14 bg-card border-2 border-b-0 p-0.5">
      <ul className="flex items-center justify-start w-full gap-5 grow">
        {!!m.conditions &&
          Object.entries(m.conditions).map(([condition, value]) => (
            <li key={condition} className="flex items-center justify-start size-12">
              <Condition
                condition={condition as MonsterCondition}
                value={value}
                className="w-full h-full"
              />
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
                    className="flex items-center justify-start w-full"
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
