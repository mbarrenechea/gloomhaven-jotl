import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { LucideTrash } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";

export const ClearMonsters = () => {
  const [, setMonsters] = useLocalStorage("monsters", []);

  const handleClear = () => {
    setMonsters([]);
  };

  return (
    <AlertDialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertDialogTrigger asChild>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full w-10 h-10 pointer-events-auto shadow-2xl"
            >
              <LucideTrash className="size-5" />
            </Button>
          </AlertDialogTrigger>
        </TooltipTrigger>

        <TooltipContent>
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl">Clear all monsters</span>
          </div>
        </TooltipContent>
      </Tooltip>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your monsters and all their
            progress. This action is irreversible and will remove all monsters from the game.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleClear}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
