import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Task } from "@/types";
import { Plus } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { fetchData } from "@/lib";
import useAuth from "@/hooks/useAuth";
import { Spinner } from "@nextui-org/react";

const taskSchema = z.object({
  taskName: z.string().min(1, "Task name is required"),
  flag: z.enum(["feature", "improvement", "bug", "refactor", "documentation"]),
  duration: z.string().min(1, "Duration is required"),
  dependencies: z.array(z.string()),
});

type TaskFormValues = z.infer<typeof taskSchema>;

type Props = {
  tasks: Task[];
  refetch: () => void;
  projectId: string;
};

export function TaskCreationDialog({ refetch, tasks, projectId }: Props) {
  const [open, setOpen] = useState(false);
  const { token } = useAuth();

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      taskName: "",
      flag: "feature",
      duration: "",
      dependencies: [],
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TaskFormValues) =>
      fetchData({
        endpoint: `${projectId}/tasks/create`,
        feature: "projects",
        method: "POST",
        accessToken: token as string,
        data: {
          task: data.taskName,
          duration: data.duration,
          flag: data.flag.toLocaleUpperCase(),
          dependencies: data.dependencies,
          prevTag: tasks.length > 0 ? tasks[tasks.length - 1].tag : undefined,
        },
      }),
    mutationKey: ["createTask", projectId],

    onSuccess: () => {
      refetch();
      setOpen(false);
      form.reset();
    },
  });

  function onSubmit(data: TaskFormValues) {
    mutate(data);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <Plus /> Create task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="taskName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter task name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="flag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Flag</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a flag" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="feature">Feature</SelectItem>
                      <SelectItem value="improvement">Improvement</SelectItem>
                      <SelectItem value="bug">Bug</SelectItem>
                      <SelectItem value="refactor">Refactor</SelectItem>
                      <SelectItem value="documentation">
                        Documentation
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter duration" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dependencies"
              render={() => (
                <FormItem>
                  <FormLabel>Dependencies</FormLabel>
                  <div className="space-y-2 max-h-80 overflow-auto">
                    {tasks.map((task) => (
                      <FormField
                        key={task.id}
                        control={form.control}
                        name="dependencies"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={task.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(task.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          task.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== task.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {task.task}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              {isPending ? <Spinner color="white" size="sm" /> : "Create Task"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
