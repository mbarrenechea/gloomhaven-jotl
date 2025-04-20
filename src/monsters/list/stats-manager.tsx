import { Condition } from "@/components/condition";
import { Stat } from "@/components/stat";
import { Monster, MonsterSkills } from "@/monsters/types";

export const StatsManager = (m: Monster) => {
  const { index, health, movement, attack, skills } = m;
  return (
    <div className="absolute z-20 w-full h-full top-0 left-0 grid grid-cols-2 gap-2 pointer-events-none">
      <div className="flex flex-col items-start justify-start w-full h-full text-foreground bg-gradient-to-r from-black/50 to-transparent pt-2">
        <Stat variant="health" size="lg">
          {health}
        </Stat>
        <Stat variant="movement" size="lg">
          {movement}
        </Stat>
        <Stat variant="attack" size="lg">
          {attack}
        </Stat>
      </div>
      <div className="flex flex-col items-end justify-start w-full h-full text-foreground">
        <Stat variant="default" size="default">
          {index}
        </Stat>
        {Object.entries(skills ?? {}).map(([key, value]) => (
          <Condition condition={key as MonsterSkills} value={value} />
        ))}
      </div>
    </div>
  );
};
