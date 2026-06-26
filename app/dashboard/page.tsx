"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import TaskTable from "@/components/TaskTable";
import TaskDialog from "@/components/TaskDialog";

import { initialTasks } from "@/data/task";
import { Task } from "@/types/task";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");

  // Check login
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");

    if (!loggedIn) {
      router.push("/login");
    }
  }, [router]);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks) as Task[]);
    } else {
      setTasks(initialTasks);
    }

    setIsLoaded(true);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks, isLoaded]);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const editTask = (updatedTask: Task) => {
  setTasks((prev) =>
    prev.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    )
  );



  setEditingTask(null);
};

const filteredTasks = tasks
  .filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;

    return matchesSearch && matchesStatus;
  })
  .sort((a, b) => {
    if (sortOrder === "asc") {
      return (
        new Date(a.dueDate).getTime() -
        new Date(b.dueDate).getTime()
      );
    }

    return (
      new Date(b.dueDate).getTime() -
      new Date(a.dueDate).getTime()
    );
  });

  const changeStatus = (
  id: number,
  status: Task["status"]
) => {
  setTasks((prev) =>
    prev.map((task) =>
      task.id === id
        ? { ...task, status }
        : task
    )
  );
};

  if (!isLoaded) {
    return (
      <div className="mx-auto max-w-7xl p-4 md:p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-8">
       <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">
          Task Dashboard
        </h1>

        <div className="flex flex-wrap gap-2">
          <TaskDialog
            onAddTask={addTask}
            onEditTask={editTask}
            editingTask={editingTask}
          />

          <Button onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
      <div className="mb-6 flex flex-col flex-wrap gap-3 md:flex-row">
  <Input
    className="flex-1"
    placeholder="Search by title..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select
    className="rounded border px-3"
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="All">All</option>
    <option value="Todo">Todo</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
  </select>

  <select
    className="rounded border px-3"
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
  >
    <option value="asc">Due Date ↑</option>
    <option value="desc">Due Date ↓</option>
  </select>
</div>
     <TaskTable
        tasks={filteredTasks}
        onDelete={deleteTask}
        onEdit={setEditingTask}
        onStatusChange={changeStatus}
      />
    </div>
  );
}