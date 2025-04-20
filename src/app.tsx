import { Header } from "@/header";
import { AddMonster } from "./monsters/add";
import { MonsterList } from "@/monsters/list";
import { ClearMonsters } from "@/monsters/clear";

function App() {
  return (
    <main>
      <Header />
      <MonsterList />

      <div className="fixed w-full bottom-10 pointer-events-none">
        <div className="container flex items-end justify-end gap-3">
          <ClearMonsters />
          <AddMonster />
        </div>
      </div>
    </main>
  );
}

export default App;
