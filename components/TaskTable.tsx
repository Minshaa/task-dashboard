"use client";

import { Task } from "@/types/task";
import { Button } from "@/components/ui/button";

interface TaskTableProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
  onStatusChange: (
    id: number,
    status: Task["status"]
  ) => void;
}

export default function TaskTable({
  tasks,
  onDelete,
  onEdit,
  onStatusChange,
}: TaskTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-100 dark:bg-slate-800">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Due Date</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="p-6 text-center text-gray-500"
              >
                No tasks found.
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id} className="border-t">
                <td className="p-3">{task.title}</td>

                <td className="p-3">
                  {task.description}
                </td>

                <td className="p-3">
                  <select
                    value={task.status}
                    onChange={(e) =>
                      onStatusChange(
                        task.id,
                        e.target.value as Task["status"]
                      )
                    }
                    className={`rounded px-2 py-1 text-white font-medium
                      ${
                        task.status === "Completed"
                          ? "bg-green-500"
                          : task.status === "In Progress"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                      }`}
                  >
                    <option value="Todo">Todo</option>
                    <option value="In Progress">
                      In Progress
                    </option>
                    <option value="Completed">
                      Completed
                    </option>
                  </select>
                </td>

                <td className="p-3">
                  {task.dueDate}
                </td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => onEdit(task)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        onDelete(task.id)
                      }
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}