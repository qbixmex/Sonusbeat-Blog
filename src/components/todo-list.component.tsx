import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";

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

export const TodoList = () => {
  return (
    <ScrollArea className="h-full overflow-y-auto rounded-md border p-4">
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
    </ScrollArea>
  );
};

export default TodoList;