import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { PropsWithChildren } from "react";

const statVariants = cva("font-display px-4 py-1 text-2xl", {
  variants: {
    variant: {
      default: "bg-accent",
      health: "bg-red-400 text-red-900",
      movement: "bg-blue-400 text-blue-800",
      attack: "bg-green-400 text-green-900",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const Stat = ({
  children,
  variant = "default",
  className,
}: PropsWithChildren<{
  variant?: "default" | "health" | "movement" | "attack";
  className?: string;
}>) => {
  return <span className={cn(statVariants({ variant, className }))}>{children}</span>;
};
