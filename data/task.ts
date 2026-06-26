import { Task } from "@/types/task";

export const initialTasks: Task[] = [
  {
    id: 1,
    title: "Design Login Page",
    description: "Create login UI using shadcn",
    status: "Completed",
    dueDate: "2026-06-28",
  },
  {
    id: 2,
    title: "Build Dashboard",
    description: "Display tasks",
    status: "In Progress",
    dueDate: "2026-06-30",
  },
  {
    id: 3,
    title: "Add CRUD",
    description: "Implement create, edit and delete",
    status: "Todo",
    dueDate: "2026-07-02",
  },
];