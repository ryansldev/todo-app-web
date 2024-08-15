'use client';

import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { apiUrl } from "@/utils/apiUrl";
import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";

interface TaskProps {
  id: string;
  title: string;
  done: boolean;
}

export function Task({
  id,
  title,
  done,
}: TaskProps) {
  const [isDone, setIsDone] = useState(done)
  
  async function onCheck() {
    await fetch(
      `${apiUrl}/tasks/${id}`,
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          done: !isDone
        })
      }
    )
    setIsDone(!isDone)
  }

  async function handleDelete() {
    await fetch(
      `${apiUrl}/tasks/${id}`,
      { method: 'DELETE' }
    )
  }

  return (
    <div className="flex items-center justify-between w-full px-2 mb-2">
      <div className="flex items-center space-x-2">
        <Checkbox id={id} checked={isDone} onCheckedChange={onCheck} color="#0f0f0f" />
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-200"
        >
          {title}
        </label>
      </div>
      <div>
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8 bg-red-900 hover:bg-red-800"
          onClick={handleDelete}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}