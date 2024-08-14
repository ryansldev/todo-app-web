'use client'

import { Task as TaskType } from "@/types/Task"
import { Task } from "./task"

interface TaskListProps {
  tasks: TaskType[]
}

export function TaskList({
  tasks
}: TaskListProps) {
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
    </div>
  )
}