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

const formSchema = z.object({
  id: z.string().min(1, "Please select a monster"),
  level: z.number().min(0).max(7),
  type: z.enum(["normal", "elite"]),
  quantity: z.number().min(1).max(8),
});

export const MonsterForm = () => {
  const [, setMonsters] = useLocalStorage<Monster[]>("monsters", []);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      level: 2,
      type: "normal",
      quantity: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { id, type, quantity } = values;
    setMonsters((prev) => {
      const arr = Array.from({ length: quantity }, (_, i) => {
        const monster = MONSTERS.find((monster) => monster.id === id);
        if (!monster) return null;
        return {
          id,
          index: i,
          name: monster.name,
          level: values.level as MonsterLevel,
          type: values.type,
          health: monster[type].health[values.level],
          movement: monster[type].movement[values.level],
          attack: monster[type].attack[values.level],
        } satisfies Monster;
      }).filter((monster) => monster !== null) as Monster[];

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
                    <SelectTrigger className="w-full text-lg">
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

        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem className="pb-4">
              <FormLabel className="text-2xl font-display">Level</FormLabel>
              <FormControl>
                <RadioGroup
                  className="grid grid-cols-8 gap-1"
                  value={`${field.value}`}
                  onValueChange={(e) => field.onChange(+e)}
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
                        className="peer-aria-checked:bg-primary peer-aria-checked:text-foreground text-foreground/50 w-full rounded-sm py-2 text-center justify-center font-display text-base transition-colors duration-300 ease-in-out border"
                      >
                        {level}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
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
