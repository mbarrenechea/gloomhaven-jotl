import { Condition } from "@/components/condition";
import { Stat } from "@/components/stat";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Monster, MonsterSkills } from "@/monsters/types";
import { useLocalStorage } from "usehooks-ts";

export const MonsterItem = ({
  id,
  type,
  index,
  image,
  health,
  movement,
  attack,
  skills,
}: Monster) => {
  const [, setMonsters] = useLocalStorage<Monster[]>("monsters", []);

  const handleHealthChange = (v: number) => {
    // Handle health increment logic here
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

  const handleDeleteMonster = () => {
    setMonsters((prev) => {
      const monsterIndex = prev.findIndex((monster) => monster.id === id);
      if (monsterIndex === -1) return prev;

      const newMonsters = [...prev];
      newMonsters.splice(monsterIndex, 1);

      return newMonsters;
    });
  };

  return (
    <div
      className={cn({
        "relative bg-card w-full shadow-md p-4 pb-0 rounded-lg overflow-hidden": true,
        "border-2 border-amber-300": type === "elite",
        "border-2 border-white": type === "normal",
      })}
    >
      {health <= 0 && (
        <div
          className={cn(
            "flex flex-col items-center justify-center absolute z-20 top-0 left-0 bottom-0 right-0 bg-background/50 rounded-lg overflow-hidden fade-in duration-1000",
            {
              "animate-in": health <= 0,
            },
          )}
        >
          <img
            src="/monsters/blood.png"
            alt="dead"
            className={cn("absolute top-0 left-0 w-full h-full object-cover opacity-60", {
              "animate-in": health <= 0,
            })}
          />

          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-foreground gap-1">
            <p className="text-xl font-sans">Remember to put a coin</p>
            <Button variant="destructive" onClick={handleDeleteMonster}>
              Remove
            </Button>
          </div>
        </div>
      )}

      <div className="w-full h-full aspect-square rounded-full overflow-hidden">
        <img src={image} alt={type} className="w-full object-cover" />
      </div>

      <div className="z-30 relative w-full bottom-0 left-0 flex items-center justify-start pointer-events-none h-10 bg-card border-2 border-b-0"></div>

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
        <div className="flex flex-col items-end justify-start w-full h-full text-foreground">
          <Stat variant="default" size="default">
            {index}
          </Stat>
          {Object.entries(skills ?? {}).map(([key, value]) => (
            <Condition condition={key as MonsterSkills} value={value} />
          ))}
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
