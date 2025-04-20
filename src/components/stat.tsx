import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { PropsWithChildren } from "react";

const statVariants = cva("font-display px-4 py-1 text-2xl flex items-center justify-center gap-1", {
  variants: {
    variant: {
      default: "text-foreground",
      health: "text-red-400 fill-red-400",
      movement: "text-blue-400 fill-blue-800",
      attack: "text-foreground fill-red-900",
    },
    size: {
      default: "text-xl py-2 px-4",
      sm: "text-3xl py-0 px-2",
      lg: "text-5xl py-1 px-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export const Stat = ({
  children,
  variant = "default",
  size = "default",
  className,
}: PropsWithChildren<{
  variant?: "default" | "health" | "movement" | "attack";
  size?: "default" | "sm" | "lg";
  className?: string;
}>) => {
  return <span className={cn(statVariants({ variant, size, className }))}>{children}</span>;
};
