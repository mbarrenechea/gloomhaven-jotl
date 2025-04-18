import { useMonsters } from "@/lib/monsters";
import { Monster } from "@/monsters/types";
import { MonsterGroupItem } from "./item";

export const MonsterGroupList = () => {
  const monstersGroups = useMonsters();

  return (
    <section className="py-10">
      <div className="container">
        {monstersGroups.map((monsterGroup) => {
          const [groupKey, monsters] = monsterGroup;
          const [id, type, level] = groupKey.split(":");

          return (
            <MonsterGroupItem
              key={groupKey}
              id={id}
              type={type as Monster["type"]}
              level={+level as Monster["level"]}
              monsters={monsters}
            />
          );
        })}
      </div>
    </section>
  );
};
