import { Button } from "@/components/ui/button";
import { LucidePlus } from "lucide-react";

export const AddMonster = () => {
  return (
    <div className="fixed w-full bottom-10 pointer-events-none">
      <div className="container flex justify-end">
        <Button
          size="icon"
          variant="default"
          className="rounded-full w-16 h-16 pointer-events-auto"
        >
          <LucidePlus className="size-8" />
        </Button>
      </div>
    </div>
  );
};
