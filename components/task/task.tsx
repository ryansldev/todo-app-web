'use client';

import { useState } from "react";
import { Checkbox } from "../ui/checkbox";

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
      `http://localhost:3333/tasks/${id}`,
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

  return (
    <div className="flex items-center justify-center space-x-2">
      <Checkbox id={id} checked={isDone} onCheckedChange={onCheck} />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {title}
      </label>
    </div>
  )
}