import { useMonsters } from "@/lib/monsters";
import { MonsterItem } from "@/monsters/list/item";
import { Monster } from "@/monsters/types";
import { useCallback, useMemo, useState } from "react";

import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import { useLocalStorage } from "usehooks-ts";

type Size = {
  width?: number;
  height?: number;
};

export const MonsterList = () => {
  const [rowHeight, setRowHeight] = useState(0);
  const [, setMonsters] = useLocalStorage<Monster[]>("monsters", []);
  const monsters = useMonsters();

  const ResponsiveReactGridLayout = useMemo(() => WidthProvider(Responsive), []);

  const handleResize = useCallback((size: Size) => {
    setRowHeight(size.height || 10);
  }, []);

  console.log(rowHeight);

  const ITEMS = useMemo(() => {
    return monsters.map((monster) => (
      <li key={`${monster.id}`} className="relative list-none" data-grid={monster.grid}>
        <MonsterItem {...monster} onResize={handleResize} />
      </li>
    ));
  }, [monsters, handleResize]);

  const handleLayoutChange = useCallback(
    (layout: Layout[]) => {
      if (!layout) return;

      setMonsters((prev) => {
        const newMonsters = [...prev];

        layout.forEach((item) => {
          const monsterIndex = newMonsters.findIndex((monster) => monster.id === item.i);

          if (monsterIndex !== -1) {
            newMonsters[monsterIndex].grid = item;
          }
        });

        return newMonsters;
      });
    },
    [setMonsters],
  );

  return (
    <section className="py-5">
      <div className="container">
        <div className="-mx-2.5">
          <ResponsiveReactGridLayout
            cols={{
              lg: 5,
              md: 4,
              sm: 3,
              xs: 2,
              xxs: 1,
            }}
            layouts={{
              lg: monsters.map((monster) => monster.grid),
            }}
            rowHeight={rowHeight}
            breakpoints={{ lg: 768, md: 600, sm: 480, xs: 400 }}
            margin={[10, 10]}
            isResizable={false}
            isDraggable={true}
            compactType="horizontal"
            draggableHandle=".draggable-handle"
            onLayoutChange={handleLayoutChange}
          >
            {ITEMS}
          </ResponsiveReactGridLayout>
        </div>
      </div>
    </section>
  );
};
