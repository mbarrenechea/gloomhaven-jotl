import { cn } from "@/lib/utils";
import { ConditionManager } from "@/monsters/list/condition-manager";
import { DeathManager } from "@/monsters/list/death-manager";
import { HealthManager } from "@/monsters/list/health-manager";
import { StatsManager } from "@/monsters/list/stats-manager";
import { Monster } from "@/monsters/types";

export const MonsterItem = (monster: Monster) => {
  const { image, type } = monster;

  return (
    <div
      className={cn({
        "relative bg-card w-full shadow-md p-4 pb-0 rounded-lg overflow-hidden": true,
        "border-2 border-amber-300": type === "elite",
        "border-2 border-white": type === "normal",
      })}
    >
      <div className="w-full h-full aspect-square rounded-full overflow-hidden">
        <img src={image} alt={type} className="w-full object-cover" />
      </div>
      <ConditionManager {...monster} />

      <DeathManager {...monster} />
      <StatsManager {...monster} />
      <HealthManager {...monster} />
    </div>
  );
};
