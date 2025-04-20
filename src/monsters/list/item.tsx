import { Stat } from "@/components/stat";
import { cn } from "@/lib/utils";
import { Monster } from "@/monsters/types";
import { useLocalStorage } from "usehooks-ts";

export const MonsterItem = ({ id, type, index, image, health, movement, attack }: Monster) => {
  const [, setMonsters] = useLocalStorage<Monster[]>("monsters", []);
  const handleHealthChange = (v: number) => {
    // Handle health increment logic here
    console.log(id, health);
    setMonsters((prev) => {
      const monsterIndex = prev.findIndex((monster) => monster.id === id);
      if (monsterIndex === -1) return prev;

      const newMonsters = [...prev];
      const h = newMonsters[monsterIndex].health + v;
      if (h < 0) {
        newMonsters[monsterIndex].health = 0;

        return newMonsters;
      }

      if (h >= 0) {
        newMonsters[monsterIndex].health = h;

        return newMonsters;
      }

      return newMonsters;
    });
  };

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
      <div className="absolute w-full h-full top-0 left-0 grid grid-cols-2 gap-2 pointer-events-none">
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
        <div className="flex flex-col items-end justify-between w-full h-full text-foreground pt-2">
          <Stat variant="default" size="default">
            {index}
          </Stat>
        </div>
      </div>

      <div className="absolute z-10 w-full h-full top-0 left-0 flex flex-col items-center justify-center">
        <button
          type="button"
          className="grow w-full bg-transparent from-background/50 to-transparent active:bg-gradient-to-b"
          onClick={() => handleHealthChange(1)}
        />
        <button
          type="button"
          className="grow w-full bg-transparent from-background/50 to-transparent active:bg-gradient-to-t"
          onClick={() => handleHealthChange(-1)}
        />
      </div>
    </div>
  );
};
