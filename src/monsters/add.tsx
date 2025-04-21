import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LucidePlus } from "lucide-react";
import { MonsterForm } from "./form";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const AddMonster = () => {
  return (
    <Sheet>
      <Tooltip>
        <TooltipTrigger asChild>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="default"
              className="rounded-full w-16 h-16 pointer-events-auto shadow-2xl"
            >
              <LucidePlus className="size-8" />
            </Button>
          </SheetTrigger>
        </TooltipTrigger>

        <TooltipContent>
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl">Add new monster</span>
          </div>
        </TooltipContent>
      </Tooltip>

      <SheetContent className="p-8 bg-sidebar">
        <SheetTitle className="text-2xl font-display sr-only">Add new monsters</SheetTitle>
        <SheetDescription className="text-xl sr-only">
          Use this sheet to add a{" "}
          <strong className="text-foreground">new monster to the game.</strong> You can select the
          monster type and level, and the sheet will automatically calculate the monster's stats
          based on the selected level. You can also add any special abilities or characteristics
          that the monster may have. Once you have filled out all the necessary information, click
          the "Add Monster" button to add the monster to the game. The new monster will be added to
          the list of active monsters, and you can start using it in your game right away. If you
          need to make any changes to the monster later, you can always edit its stats or abilities
          from the active monsters list.
        </SheetDescription>

        <MonsterForm />
      </SheetContent>
    </Sheet>
  );
};
