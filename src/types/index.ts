export interface State<D> {
  status: "idle" | "loading" | "error" | "success";
  data: D | null;
  error: Error | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  team: string;
  token: string;
}

export interface Project {
  id: string;
  name: string;
  teamLeadId: string;
  pin: boolean;
  team: string;
  createdAt: number;
}
