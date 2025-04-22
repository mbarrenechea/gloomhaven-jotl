import { cn } from "@/lib/utils";
import { MonsterCondition, MonsterInmunities, MonsterSkills } from "@/monsters/types";

export const Condition = ({
  condition,
  value,
  inmunity = false,
  className,
}: {
  condition: MonsterCondition | MonsterSkills | MonsterInmunities;
  value: number;
  inmunity?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(`relative p-1 bg-foreground size-10 ${className}`, {
        // create an after pseudoelement cross line from bottom-left to top-right
        "after:content-[''] after:absolute after:w-[calc(100%_*_1.41)] after:h-1 after:bg-red-500 after:top-1/2 after:left-1/2 after:rotate-45 after:-translate-x-1/2 after:-translate-y-1/2":
          inmunity,
      })}
    >
      <img
        src={`/conditions/${condition}.png`}
        alt={condition}
        className="w-full h-full object-cover"
      />

      {value > 1 && (
        <span className="absolute w-1/2 h-full right-full top-0 flex items-center justify-center text-2xl font-bold font-display text-background bg-foreground">
          {value}
        </span>
      )}
    </div>
  );
};
