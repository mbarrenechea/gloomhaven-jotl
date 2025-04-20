import { Stat } from "@/components/stat";
import { cn } from "@/lib/utils";
import { Monster } from "@/monsters/types";

export const MonsterItem = ({ type, index, image, health, movement, attack }: Monster) => {
  return (
    <div
      className={cn({
        "relative bg-card w-full shadow-md p-4 rounded-lg overflow-hidden": true,
        "border-2 border-amber-300": type === "elite",
        "border-2 border-white": type === "normal",
      })}
    >
      <div className="w-full h-full aspect-square rounded-full overflow-hidden">
        <img src={image} alt={type} className="w-full object-cover" />
      </div>
      <div className="absolute w-full h-full top-0 left-0 grid grid-cols-2 gap-2">
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
        <div className="flex flex-col items-end justify-between w-full h-full text-foreground">
          <Stat variant="default">{index}</Stat>
        </div>
      </div>
    </div>
  );
};
