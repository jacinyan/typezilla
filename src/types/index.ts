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

export interface SortProps {
  //origin item
  fromId: number;
  //target item
  referenceId: number;
  //insert position
  type: "before" | "after";
  //for tasks
  fromSwimlaneId?: number;
  toSwimlaneId?: number;
}

export interface Epic {
  id: number;
  name: string;
  projectId: number;
  swimlaneId: number;
  //start time
  start: number;
  //end time
  end: number;
}
