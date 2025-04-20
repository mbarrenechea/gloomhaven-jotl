import { useMonsters } from "@/lib/monsters";
import { cn } from "@/lib/utils";
import { MonsterItem } from "@/monsters/list/item";

export const MonsterList = () => {
  const monsters = useMonsters();

  return (
    <section className="py-10">
      <div className="container">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-start">
          {monsters.map((monster) => (
            <li
              key={`${monster.id}-${monster.type}-${monster.index}`}
              className={cn("flex items-center justify-start w-full", {
                "col-span-2": monster.boss,
              })}
            >
              <MonsterItem {...monster} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
