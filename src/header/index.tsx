"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useLocalStorage } from "usehooks-ts";

const PLAYERS = [2, 3, 4] as const;

export const Header = () => {
  const [players, setPlayers] = useLocalStorage("players", 4);
  const [level, setLevel] = useLocalStorage("level", 2);

  const handlePlayerChange = (value: string) => {
    setPlayers(+value);
  };

  const handleLevelChange = (value: string) => {
    setLevel(+value);
  };

  return (
    <header className="bg-card py-4 text-foreground">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <h1 className="font-display text-4xl">Gloomhaven</h1>

          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
            <div className="flex items-center gap-4">
              <Label
                htmlFor="players"
                className="font-sans block text-md leading-0 tracking-widest uppercase"
              >
                Players:
              </Label>

              <RadioGroup
                id="players"
                value={`${players}`}
                className="flex items-center gap-1"
                onValueChange={handlePlayerChange}
              >
                {PLAYERS.map((player) => (
                  <div className="flex items-center" key={player}>
                    <RadioGroupItem className="peer hidden" value={`${player}`} id={`${player}`} />
                    <Label
                      htmlFor={`${player}`}
                      className="peer-aria-checked:bg-primary peer-aria-checked:text-foreground text-foreground/50 w-full rounded-sm size-8 text-center justify-center font-display text-base transition-colors duration-300 ease-in-out border"
                    >
                      {player}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex items-center gap-4">
              <Label
                htmlFor="level"
                className="font-sans block text-md leading-0 tracking-widest uppercase"
              >
                Level:
              </Label>
              <RadioGroup
                className="grid grid-cols-8 gap-1"
                value={`${level}`}
                onValueChange={handleLevelChange}
              >
                {Array.from({ length: 8 }, (_, i) => i).map((level) => (
                  <div key={level} className="flex items-center gap-2">
                    <RadioGroupItem
                      value={`${level}`}
                      id={`level-${level}`}
                      className="peer hidden"
                    />
                    <Label
                      htmlFor={`level-${level}`}
                      className="peer-aria-checked:bg-primary peer-aria-checked:text-foreground text-foreground/50 w-full rounded-sm size-8 text-center justify-center font-display text-base transition-colors duration-300 ease-in-out border"
                    >
                      {level}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
