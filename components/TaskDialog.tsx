"use client";


import { useEffect, useState } from "react";
import { Task } from "@/types/task";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";



interface TaskDialogProps {
  onAddTask: (task: Task) => void;
  onEditTask?: (task: Task) => void;
  editingTask?: Task | null;

}

export default function TaskDialog({
  onAddTask,
  onEditTask,
  editingTask,
}: TaskDialogProps) {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Task["status"]>("Todo");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
  if (editingTask) {
    setTitle(editingTask.title);
    setDescription(editingTask.description);
    setStatus(editingTask.status);
    setDueDate(editingTask.dueDate);
    setOpen(true);
  }
}, [editingTask]);

  const handleSubmit = () => {
    if (!title || !description || !dueDate) {
      alert("Please fill all fields.");
      return;
    }

    const task: Task = {
  id: editingTask ? editingTask.id : Date.now(),
  title,
  description,
  status,
  dueDate,
};

if (editingTask && onEditTask) {
  onEditTask(task);
} else {
  onAddTask(task);
}

    setTitle("");
    setDescription("");
    setStatus("Todo");
    setDueDate("");

    setOpen(false);
  };

  return (
  <>
    <Button onClick={() => setOpen(true)}>
      Add Task
    </Button>

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
  {editingTask ? "Edit Task" : "Add New Task"}
</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="w-full rounded border p-2"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as Task["status"])
            }
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <Button
            className="w-full"
            onClick={handleSubmit}
          >
            {editingTask ? "Update Task" : "Add Task"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  </>
    );
}