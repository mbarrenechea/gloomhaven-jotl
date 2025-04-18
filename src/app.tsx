import { Header } from "@/header";
import { AddMonster } from "./monsters/add";
import { MonsterGroupList } from "./monsters/groups";

function App() {
  return (
    <main>
      <Header />
      <AddMonster />
      <MonsterGroupList />
    </main>
  );
}

export default App;
