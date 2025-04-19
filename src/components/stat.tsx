import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { PropsWithChildren } from "react";

const statVariants = cva("font-display px-4 py-1 text-2xl flex items-center justify-center gap-1", {
  variants: {
    variant: {
      default: "bg-accent",
      health: "bg-red-400 text-red-900 fill-red-900",
      movement: "bg-blue-400 text-blue-800 fill-blue-800",
      attack: "bg-green-400 text-green-900 fill-green-900",
    },
    size: {
      default: "text-xl",
      sm: "text-3xl py-0 px-2",
      lg: "text-5xl",
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
