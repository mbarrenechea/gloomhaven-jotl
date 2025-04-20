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
    <div className={`relative border-2 border-foreground size-10 ${className}`}>
      <img
        src={`/conditions/${condition}.png`}
        alt={condition}
        className="w-full h-full object-cover"
      />

      {value > 1 && (
        <span className="absolute w-1/2 h-full right-full top-0 flex items-center justify-center text-base font-bold font-display text-white bg-accent">
          {value}
        </span>
      )}
    </div>
  );
};
