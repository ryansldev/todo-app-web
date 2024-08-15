import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format, formatISO } from "date-fns"
import { cn } from "@/lib/utils";
import { apiUrl } from "@/utils/apiUrl";
import { Task } from "@/types/Task";
import { useState } from "react";

interface TaskDatePickerProps {
  task: Task;
}

export function TaskDatePicker({
  task,
}: TaskDatePickerProps) {
  async function updateDate(deadline: Date | undefined) {
    if(!deadline) return
    console.log(format(deadline, 'yyyy-MM-dd'))
    await fetch(`${apiUrl}/tasks/${task.id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify({
        deadline: formatISO(deadline),
      })
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !task.deadline && "text-muted-foreground"
          )}
          size="sm"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {task.deadline ? format(task.deadline, "dd/MM/yyyy") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={task.deadline}
          onSelect={updateDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}