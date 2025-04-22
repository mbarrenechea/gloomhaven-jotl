import { Monster } from "@/monsters/types";

export const SpecialManager = (m: Monster) => {
  if (!m.special || !m.special.length) return null;

  return (
    <ul className="absolute bottom-0 left-0 z-20 flex flex-col items-center justify-start w-full gap-6 px-14 py-20 text-foreground bg-gradient-to-t from-black/50 to-transparent pointer-events-none">
      {m.special.map((s, i) => (
        <li
          key={i}
          className="flex w-full items-center justify-center text-2xl 2xl:text-4xl text-center bg-card/50"
        >
          {i + 1}: {s}
        </li>
      ))}
    </ul>
  );
};
