'use client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Task as TaskType } from "@/types/Task"
import { Task } from "./task"

import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

import { SendIcon } from "lucide-react"
import { apiUrl } from "@/utils/apiUrl"

interface TaskListProps {
  tasks: TaskType[]
}

const formSchema = z.object({
  title: z.string(),
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
    await fetch(`${apiUrl}/tasks`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    })
  }

  return (
    <div className="flex flex-col items-start max-w-[300px] mx-auto gap-4 bg-slate-900 rounded-lg p-10 text-slate-100">
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
          <div className="flex w-full max-w-sm items-center relative">
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
            <Button type="submit" variant="ghost" className="text-blue-400 absolute right-0" size="icon">
              <SendIcon className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}