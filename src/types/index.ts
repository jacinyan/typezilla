export type StringOrNumber = string | number;

export interface AsyncState<D> {
  status: "idle" | "loading" | "error" | "success";
  data: D | null;
  error: Error | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  team: string;
  token: string;
}

export interface Project {
  id: number;
  name: string;
  team: string;
  projectLeadId: number;
  marked: boolean;
  createdAt: number;
}

export interface SwimlaneProps {
  id: number;
  name: string;
  projectId: number;
}

export interface Task {
  id: number;
  name: string;
  assigneeId: number;
  projectId: number;
  //task group
  epicId: number;
  swimlaneId: number;
  //bug or task
  typeId: number;
  notes: string;
}

export interface TaskType {
  id: number;
  name: string;
}
