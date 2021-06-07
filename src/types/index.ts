import { TableProps } from "antd/lib/table";

export type StringOrNumber = string | number;

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

export interface SearchPanelProps {
  users: User[];
  paramsObj: {
    name: string;
    teamLeadId: string;
  };
  //dynamically updates setParamsObj type WRT paramsObj
  setParamsObj: (paramsObj: SearchPanelProps["paramsObj"]) => void;
}

export interface ListProps extends TableProps<Project> {
  users: User[];
}
