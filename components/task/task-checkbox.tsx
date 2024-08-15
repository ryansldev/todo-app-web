import { Checkbox } from "../ui/checkbox";
import { apiUrl } from "@/utils/apiUrl";

interface TaskCheckboxProps {
  id: string;
  isDone: boolean;
  setIsDone: (isDone: boolean) => void;
}

export function TaskCheckbox({
  id,
  isDone,
  setIsDone,
}: TaskCheckboxProps) {
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

  return (
    <Checkbox
      id={id}
      checked={isDone}
      onCheckedChange={onCheck}
    />
  )
}