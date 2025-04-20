import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import MONSTERS from "@/data/monsters.json";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "usehooks-ts";
import { Monster, MonsterLevel } from "./types";
import { useCallback, useRef } from "react";

const formSchema = z.object({
  id: z.string().min(1, "Please select a monster"),
  type: z.enum(["normal", "elite"]),
  quantity: z.number().min(1).max(8),
});

export const MonsterForm = () => {
  const [level] = useLocalStorage<MonsterLevel>("level", 2);
  const [monsters, setMonsters] = useLocalStorage<Monster[]>("monsters", []);
  const generatedMontersIndexes = useRef<number[]>([]);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      type: "normal",
      quantity: 1,
    },
  });

  const generateIndex = useCallback(
    (id: Monster["id"]) => {
      const index = Math.ceil(Math.random() * 6);
      const activeMonstersIndexes = monsters
        .filter((monster) => monster.monsterId === id)
        .map((monster) => monster.index);

      if (activeMonstersIndexes.length === 6) {
        console.error("All indexes are taken");
        return null;
      }

      if (
        generatedMontersIndexes.current.includes(index) ||
        activeMonstersIndexes.includes(index)
      ) {
        return generateIndex(id);
      }

      generatedMontersIndexes.current.push(index);

      return index;
    },
    [monsters],
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { id, type, quantity } = values;
    setMonsters((prev) => {
      const arr = Array.from({ length: quantity }, () => {
        const monster = MONSTERS.find((monster) => monster.id === id);
        if (!monster) return null;

        const index = generateIndex(id);

        if (!index) return null;

        return {
          id: id + index,
          monsterId: id,
          index,
          name: monster.name,
          image: monster.image,
          level,
          boss: !!monster.boss,
          type: values.type,
          health: monster[type].health[level],
          movement: monster[type].movement[level],
          attack: monster[type].attack[level],
          skills: monster[type].skills[level],
          conditions: {},
          grid: {
            i: id + index,
            x: 0,
            y: 0,
            w: monster.boss ? 2 : 1,
            h: monster.boss ? 2 : 1,
          },
        } satisfies Monster;
      }).filter((monster) => monster !== null) as Monster[];

      generatedMontersIndexes.current = [];

      return [...prev, ...arr];
    });

    form.reset();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 divide-accent divide-y">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem className="pb-4">
              <FormLabel className="text-2xl font-display">Monster</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormItem>
                    <SelectTrigger className="w-full text-2xl">
                      <SelectValue placeholder="Select a monster" />
                    </SelectTrigger>
                  </FormItem>
                  <SelectContent>
                    {MONSTERS.map((monster) => (
                      <SelectItem key={monster.id} value={monster.id}>
                        {monster.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Use RadioGroup component to select type of monster */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="pb-4">
              <FormLabel className="text-2xl font-display">Type</FormLabel>
              <FormControl>
                <RadioGroup
                  className="flex gap-1 w-full"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <div className="flex items-center gap-1 w-full">
                    <RadioGroupItem value="normal" id="normal" className="peer hidden" />
                    <Label
                      htmlFor="normal"
                      className="peer-aria-checked:bg-primary peer-aria-checked:text-foreground text-foreground/50 w-full rounded-sm py-2 px-4 text-center justify-center font-sans text-lg transition-colors duration-300 ease-in-out border"
                    >
                      Normal
                    </Label>
                  </div>
                  <div className="flex items-center gap-1 w-full">
                    <RadioGroupItem value="elite" id="elite" className="peer hidden" />
                    <Label
                      htmlFor="elite"
                      className="peer-aria-checked:bg-primary peer-aria-checked:text-foreground text-foreground/50 w-full rounded-sm py-2 px-4 text-center justify-center font-sans text-lg transition-colors duration-300 ease-in-out border"
                    >
                      Elite
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem className="pb-4">
              <FormLabel className="text-2xl font-display">Quantity</FormLabel>
              <FormControl>
                <RadioGroup
                  className="grid grid-cols-8 gap-1"
                  value={`${field.value}`}
                  onValueChange={(e) => field.onChange(+e)}
                >
                  {Array.from({ length: 8 }, (_, i) => i + 1).map((quantity) => (
                    <div key={quantity} className="flex items-center gap-2">
                      <RadioGroupItem
                        value={`${quantity}`}
                        id={`quantity-${quantity}`}
                        className="peer hidden"
                      />
                      <Label
                        htmlFor={`quantity-${quantity}`}
                        className="peer-aria-checked:bg-primary peer-aria-checked:text-foreground text-foreground/50 w-full rounded-sm py-2 text-center justify-center font-display text-base transition-colors duration-300 ease-in-out border"
                      >
                        {quantity}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant="outline" className="w-full h-16 mt-2" size="lg">
          Create
        </Button>
      </form>
    </Form>
  );
};
