import { MonsterSkills } from "@/monsters/types";

export const Condition = ({
  condition,
  value,
  className,
}: {
  condition: MonsterSkills;
  value: number;
  className?: string;
}) => {
  return (
    <div className={`relative p-1 bg-foreground size-10 ${className}`}>
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
