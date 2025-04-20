import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Monster } from "@/monsters/types";
import { useLocalStorage } from "usehooks-ts";

export const DeathManager = (m: Monster) => {
  const { health, id } = m;
  const [, setMonsters] = useLocalStorage<Monster[]>("monsters", []);

  const handleDeleteMonster = () => {
    setMonsters((prev) => {
      const monsterIndex = prev.findIndex((monster) => monster.id === id);
      if (monsterIndex === -1) return prev;

      const newMonsters = [...prev];
      newMonsters.splice(monsterIndex, 1);

      return newMonsters;
    });
  };

  if (health > 0) return null;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center absolute z-40 top-0 left-0 bottom-0 right-0 bg-background/50 rounded-lg overflow-hidden fade-in duration-1000",
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
  );
};
