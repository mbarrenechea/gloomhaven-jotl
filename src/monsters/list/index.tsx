import { MonsterItem } from "@/monsters/list/item";
import { Monster } from "@/monsters/types";

export const MonsterList = ({ monsters }: { monsters: Monster[] }) => {
  return (
    <ul className="grid grid-cols-6 gap-4">
      {monsters.map((monster) => (
        <li
          key={`${monster.id}-${monster.type}-${monster.index}`}
          className="flex items-center justify-start w-full"
        >
          <MonsterItem {...monster} />
        </li>
      ))}
    </ul>
  );
};
