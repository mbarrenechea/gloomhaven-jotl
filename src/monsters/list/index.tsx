import { useMonsters } from "@/lib/monsters";
import { MonsterItem } from "@/monsters/list/item";

export const MonsterList = () => {
  const monsters = useMonsters();

  return (
    <section className="py-10">
      <div className="container">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {monsters.map((monster) => (
            <li
              key={`${monster.id}-${monster.type}-${monster.index}`}
              className="flex items-center justify-start w-full"
            >
              <MonsterItem {...monster} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
