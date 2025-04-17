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
              className="font-display block text-sm leading-0 tracking-widest uppercase"
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
                  <RadioGroupItem className="hidden" value={player} id={player} />
                  <Label
                    className={cn({
                      "font-display h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-transparent text-base transition-colors duration-300 ease-in-out":
                        true,
                      "hover:text-foreground hover:bg-neutral-300 focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-500":
                        players !== player,
                      "text-foreground border-neutral-300 bg-amber-500": players === player,
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
