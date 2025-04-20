"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

import { useLocalStorage } from "usehooks-ts";

const PLAYERS = [2, 3, 4] as const;

export const Header = () => {
  const [, setMonsters] = useLocalStorage("monsters", []);
  const [players, setPlayers] = useLocalStorage("players", 4);

  const handlePlayerChange = (value: string) => {
    setPlayers(+value);
  };

  const handleClearMonsters = () => {
    setMonsters([]);
  };

  return (
    <header className="bg-card py-4 text-foreground">
      <div className="container">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-4xl">Gloomhaven</h1>

          <div className="flex items-center gap-4">
            <Label
              htmlFor="players"
              className="font-sans block text-md leading-0 tracking-widest uppercase"
            >
              Players:
            </Label>

            <RadioGroup
              id="players"
              defaultValue={`${players}`}
              className="flex items-center gap-1"
              onValueChange={handlePlayerChange}
            >
              {PLAYERS.map((player) => (
                <div className="flex items-center" key={player}>
                  <RadioGroupItem className="hidden" value={`${player}`} id={`${player}`} />
                  <Label
                    className={cn({
                      "font-display h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-transparent text-base transition-colors duration-300 ease-in-out":
                        true,
                      "hover:text-foreground hover:bg-secondary": players !== player,
                      "text-foreground-muted border-border bg-primary": players === player,
                    })}
                    htmlFor={`${player}`}
                  >
                    {player}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button onClick={handleClearMonsters}>Clear Monsters</Button>
        </div>
      </div>
    </header>
  );
};
