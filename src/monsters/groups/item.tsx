import { useMonsterStats } from "@/lib/monsters";
import { Monster } from "@/monsters/types";

export const MonsterGroupItem = ({
  id,
  type,
  level,
}: {
  id: Monster["id"];
  type: Monster["type"];
  level: Monster["level"];
  monsters: Monster[];
}) => {
  const MONSTER = useMonsterStats(id, type, level);
  if (!MONSTER) return null;

  return (
    <div>
      <header>
        <h2 className="text-2xl font-bold">
          {MONSTER.name} ({type})
        </h2>
        <p>
          Health: {MONSTER.health} | Movement: {MONSTER.movement} | Attack: {MONSTER.attack} | Level{" "}
          {level}
        </p>
      </header>
    </div>
  );
};
