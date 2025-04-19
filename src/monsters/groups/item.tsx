import { useMonsterStats } from "@/lib/monsters";
import { MonsterList } from "@/monsters/list";
import { Monster } from "@/monsters/types";

export const MonsterGroupItem = ({
  id,
  type,
  level,
  monsters,
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
        <p>Skills {MONSTER.skills?.join(", ")}</p>
      </header>

      <MonsterList monsters={monsters} />
    </div>
  );
};
