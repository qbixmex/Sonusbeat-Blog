"use client";

import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

type List = {
  id: string;
  title: string;
  done?: boolean;
};

const list: List[] = [
  { id: "bso2", title: "Go to the Bank", done: true },
  { id: "827d", title: "Go to School" },
  { id: "uxc7", title: "Go to the GYM" },
  { id: "sj05", title: "Buy Groceries", done: true },
  { id: "v8sk2", title: "Do Homework" },
  { id: "ph9s", title: "Do Laundry", done: true },
];

export const Scroll = () => {
  return (
    <ScrollArea className="h-full overflow-y-auto rounded-md border p-4">
      <TodoList />
      <Separator className="my-5" />
      <CalendarWidget />
    </ScrollArea>
  );
};

const TodoList = () => {
  return (
    <>
      <h2 className="text-primary-foreground text-3xl font-semibold mb-3">
        Todo List
      </h2>
      <div className="flex flex-col gap-2">
        {list.map((item) => (
          <Card key={item.id} className="py-4">
            <CardContent className="flex items-center gap-2">
              <Checkbox id={item.id} checked={item.done ? true : undefined } />
              <label htmlFor={item.id} className={cn({
                "line-through text-gray-500": item.done
              })}>
                {item.title}
              </label>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

const CalendarWidget = () => {
  const [ date, setDate ] = useState<Date|undefined>(new Date());
  const [ open, setOpen ] = useState(false);

  return (
    <>
      <h2 className="text-primary-foreground text-3xl font-semibold mb-3">
        Calendar
      </h2>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full flex items-center gap-2">
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-auto">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default Scroll;