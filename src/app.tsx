import { Header } from "@/header";
import { AddMonster } from "./monsters/add";
import { MonsterList } from "@/monsters/list";

function App() {
  return (
    <main>
      <Header />
      <AddMonster />
      <MonsterList />
    </main>
  );
}

export default App;
