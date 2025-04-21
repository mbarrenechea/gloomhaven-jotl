import { cn } from "@/lib/utils";
import { ConditionManager } from "@/monsters/list/managers/condition-manager";
import { DeathManager } from "@/monsters/list/managers/death-manager";
import { HealthManager } from "@/monsters/list/managers/health-manager";
import { StatsManager } from "@/monsters/list/managers/stats-manager";
import { Monster } from "@/monsters/types";
import { useRef } from "react";
import { useResizeObserver } from "usehooks-ts";

type Size = {
  width?: number;
  height?: number;
};

export const MonsterItem = (
  monster: Monster & {
    onResize?: (measure: Size) => void;
  },
) => {
  const ref = useRef<HTMLDivElement>(null);
  const { image, type, onResize } = monster;

  useResizeObserver({
    // @ts-expect-error Docs say to use `ref` with null but it fails
    ref,
    box: "border-box",
    onResize: (entry) => {
      const { width, height } = entry;
      if (onResize && type !== "boss") onResize({ width, height });
    },
  });

  return (
    <div
      ref={ref}
      className={cn({
        "relative bg-card w-full shadow-md p-4 pb-1 flex flex-col justify-between gap-4": true,
        "border border-t-4 border-amber-300": type === "elite",
        "border border-t-4 border-white": type === "normal",
        "border border-t-4 border-red-400 h-full": type === "boss",
      })}
    >
      <div className="w-full aspect-square rounded-full overflow-hidden">
        <img src={image} alt={type} className="w-full object-cover" />
      </div>

      <ConditionManager {...monster} />

      <button
        type="button"
        className={cn(
          "draggable-handle absolute top-0 left-1/2 -translate-1/2 z-40 h-5 w-10 rounded-sm flex flex-col items-center justify-center gap-1",
          {
            "bg-foreground": type === "normal",
            "bg-amber-300": type === "elite",
            "bg-red-400": type === "boss",
          },
        )}
      >
        <span className="w-1/2 h-px bg-accent"></span>
        <span className="w-1/2 h-px bg-accent"></span>
      </button>

      <DeathManager {...monster} />
      <StatsManager {...monster} />
      <HealthManager {...monster} />
    </div>
  );
};
