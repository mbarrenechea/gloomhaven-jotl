import { cn } from "@/lib/utils";
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

      <div className="z-30 relative w-full bottom-0 left-0 flex items-center justify-start pointer-events-none h-10 bg-card border-2 border-b-0"></div>

      <DeathManager {...monster} />
      <StatsManager {...monster} />
      <HealthManager {...monster} />
    </div>
  );
};
