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
  supervisorId: number;
  marked: boolean;
  createdAt: number;
}
