import { Condition } from "@/components/condition";
import { Monster, MonsterCondition } from "@/monsters/types";

export const InmunityManager = (m: Monster) => {
  if (!m.inmunities || !m.inmunities.length) return null;

  return m.inmunities.map((condition) => (
    <Condition
      condition={condition as MonsterCondition}
      value={1}
      inmunity
      className="2xl:size-14"
    />
  ));
};
