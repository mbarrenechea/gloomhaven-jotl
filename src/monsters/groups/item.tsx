import { AttackIcon } from "@/components/icons/attack";
import { MoveIcon } from "@/components/icons/move";
import { Stat } from "@/components/stat";
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

  const { movement, attack } = MONSTER;

  return (
    <div className="bg-accent w-full shadow-md p-4 rounded-lg">
      <header className="flex items-start justify-between gap-4 mb-4">
        <h2 className="text-2xl font-bold">{MONSTER.name}</h2>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Stat variant="movement" size="sm">
              <MoveIcon className="w-5 h-5" />
              {movement}
            </Stat>
          </div>
          <div className="flex items-center gap-2">
            <Stat variant="attack" size="sm">
              <AttackIcon className="w-5 h-5" />
              {attack}
            </Stat>
          </div>
        </div>
      </header>

      <MonsterList monsters={monsters} />
    </div>
  );
};
