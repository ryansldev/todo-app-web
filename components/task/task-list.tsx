'use client'

import { z } from "zod"
import { Task as TaskType } from "@/types/Task"
import { Task } from "./task"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

import { SendIcon } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

interface TaskListProps {
  tasks: TaskType[]
}

const formSchema = z.object({
  title: z.string().min(2),
})

export function TaskList({
  tasks
}: TaskListProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { title } = values
    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    })
  }

  return (
    <div className="flex flex-col items-start max-w-[300px] mx-auto gap-4 bg-slate-800 rounded-lg p-10">
      {tasks.map((task) => (
        <Task
          id={task.id}
          key={task.id}
          title={task.title}
          done={task.done}
        />
      ))}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter a new task..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="icon">
              <SendIcon className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}