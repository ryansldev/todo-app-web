import { Task } from "@/types/Task";
import {
  Table,
  TableBody,
} from "@/components/ui/table"
import { TasksTableRow } from "./tasks-table-row";

interface TasksTableProps {
  tasks: Task[]
}

export function TasksTable({
  tasks
}: TasksTableProps) {
  return (
    <Table className="max-w-[500px] mx-auto bg-slate-900">
      <TableBody>
        {tasks.map((task, key) => (
          <TasksTableRow
            task={task}
            key={key}
          />
        ))}
      </TableBody>
    </Table>
  )
}