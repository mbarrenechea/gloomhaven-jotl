"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

import { useLocalstorageState } from "rooks";

const PLAYERS = ["2", "3", "4"] as const;

export const Header = () => {
  const [players, setPlayers] = useLocalstorageState("players", "4");

  const handlePlayerChange = (value: string) => {
    setPlayers(value);
  };

  return (
    <header className="bg-neutral-900 py-4 text-white">
      <div className="container">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-4xl">Gloomhaven: combat</h1>

          <div className="flex items-center gap-2">
            <Label
              htmlFor="players"
              className="uppercase text-sm leading-0 block font-display tracking-widest"
            >
              Players:
            </Label>

            <RadioGroup
              id="players"
              defaultValue={players}
              className="flex items-center gap-1"
              onValueChange={handlePlayerChange}
            >
              {PLAYERS.map((player) => (
                <div className="flex items-center" key={player}>
                  <RadioGroupItem
                    className="hidden"
                    value={player}
                    id={player}
                  />
                  <Label
                    className={cn({
                      "font-display text-base w-10 h-10 border border-transparent items-center justify-center rounded-full cursor-pointer transition-colors duration-300 ease-in-out ":
                        true,
                      "hover:bg-neutral-300 hover:text-foreground focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-500":
                        players !== player,
                      "border-neutral-300 bg-amber-500 text-foreground":
                        players === player,
                    })}
                    htmlFor={player}
                  >
                    {player}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>
    </header>
  );
};
