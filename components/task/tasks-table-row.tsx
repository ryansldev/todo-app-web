import { Task } from "@/types/Task";
import { TableCell, TableRow } from "../ui/table";
import { TaskCheckbox } from "./task-checkbox";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { TrashIcon } from "lucide-react";
import { apiUrl } from "@/utils/apiUrl";
import { TaskDatePicker } from "./task-date-picker";

interface TasksTableRowProps {
  task: Task
}

export function TasksTableRow({task}: TasksTableRowProps) {
  const [isTaskDone, setIsTaskDone] = useState<boolean>(task.done)

  async function handleDelete() {
    await fetch(
      `${apiUrl}/tasks/${task.id}`,
      { method: 'DELETE' }
    )
  }

  return (
    <TableRow className={cn(isTaskDone && "opacity-50")}>
      <TableCell className="text-left w-[10px]">
        <TaskCheckbox
          id={task.id}
          isDone={isTaskDone}
          setIsDone={setIsTaskDone}
        />
      </TableCell>
      <TableCell className="font-medium text-left">{task.title}</TableCell>
      <TableCell className="w-4">
        <TaskDatePicker
          task={task}
        />
      </TableCell>
      <TableCell className="w-4">
        <Button
          variant="destructive"
          size="icon"
          onClick={handleDelete}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  )
}