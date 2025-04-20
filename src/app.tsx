import { Header } from "@/header";
import { AddMonster } from "./monsters/add";
import { MonsterList } from "@/monsters/list";
import { useMonsters } from "@/lib/monsters";

function App() {
  const monsters = useMonsters();
  return (
    <main>
      <Header />
      <AddMonster />
      <MonsterList monsters={monsters} />
    </main>
  );
}

export default App;
