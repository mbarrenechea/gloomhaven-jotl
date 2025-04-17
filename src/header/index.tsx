"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useLocalstorageState } from "rooks";

export const Header = () => {
  const [players, setPlayers] = useLocalstorageState("players", "4");

  const handlePlayerChange = (value: string) => {
    setPlayers(value);
  };

  return (
    <header className="bg-neutral-500 py-4 text-white">
      <div className="container">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl">Gloomhaven: combat</h1>

          <div>
            <Label htmlFor="players">Players</Label>

            <RadioGroup
              id="players"
              defaultValue={players}
              className="flex items-center gap-4"
              onValueChange={handlePlayerChange}
            >
              <div className="flex items-center gap-1">
                <RadioGroupItem value="2" id="2" />
                <Label className="font-display text-base" htmlFor="2">
                  2
                </Label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value="3" id="3" />
                <Label className="font-display text-base" htmlFor="3">
                  3
                </Label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value="4" id="4" />
                <Label className="font-display text-base" htmlFor="4">
                  4
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </header>
  );
};
