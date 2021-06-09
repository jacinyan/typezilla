import { REDO, RESET, SET, UNDO } from "redux/constants";

export type StringOrNumber = string | number;

export type UndoState<T> = {
  past: T[];
  present: T;
  future: T[];
};

export type UndoAction<T> = {
  newPresent?: T;
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
};

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
